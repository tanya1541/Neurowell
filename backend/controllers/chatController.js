// controllers/chatController.js
//
// ─────────────────────────────────────────────────────────────────────────────
// MODES
//   triage     — navigating the chat tree
//   tool       — running a tool script step by step
//   assessment — STORI-30: 6 groups × 5 questions, one group per screen
//                frontend shows 5 questions with Likert sliders (1–5)
//                user answers all 5, taps Next
//                POST /api/chat/message { sessionId, answers: [{questionId, answer}×5] }
//   reflection — post-tool / post-psychoed reflection question
//   psychoed   — article sent in full on mode entry; this handler receives
//                the reflection response (or 'done'/'skip')
//
// ASSESSMENT SCREENS
//   Screen 1 → Group 1 → ids  1– 5
//   Screen 2 → Group 2 → ids  6–10
//   Screen 3 → Group 3 → ids 11–15
//   Screen 4 → Group 4 → ids 16–20
//   Screen 5 → Group 5 → ids 21–25
//   Screen 6 → Group 6 → ids 26–30
//
// JWT payload: { userId } → accessed via req.user.userId throughout
// User field:  storiStage (not currentStage)
// ─────────────────────────────────────────────────────────────────────────────

const ChatSession     = require('../models/ChatSession')
const ToolEntry       = require('../models/ToolEntry')
const Assessment      = require('../models/Assessment')
const User            = require('../models/User')

const {
  chatTree,
  stageRoots,
  crisisKeywords,
  selfHarmSoftKeywords,
  stageLocked,
}                     = require('../data/chatTree')

const { toolScripts, reflectionOpeners }
                      = require('../data/toolScripts')

const toolsConfig     = require('../data/toolsConfig')
const psychoedConfig  = require('../data/psychoedConfig')
const psychoedContent = require('../data/psychoedContent')
const { calculateStage } = require('../utils/stageCalculator')
const questions       = require('../data/stori30Questions')

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STAGE_NAMES = ['', 'Moratorium', 'Awareness', 'Preparation', 'Rebuilding', 'Growth']

// 6 screens, each = all 5 questions from one group
// questions.group is 1–6; we filter by group number
function buildAssessmentScreens() {
  const screens = []
  for (let g = 1; g <= 6; g++) {
    screens.push(questions.filter(q => q.group === g))
  }
  return screens
}
const ASSESSMENT_SCREENS = buildAssessmentScreens()

// ─────────────────────────────────────────────────────────────────────────────
// CRISIS HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const hasCrisisKeyword = text =>
  !!text && crisisKeywords.some(kw => text.toLowerCase().includes(kw))

const hasSoftKeyword = text =>
  !!text && selfHarmSoftKeywords.some(kw => text.toLowerCase().includes(kw))

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY — POST /api/chat/message
// ─────────────────────────────────────────────────────────────────────────────

async function sendMessage(req, res) {
  try {
    const userId = req.user.userId
    const { sessionId, text, answers, fromOption } = req.body
    // assessment mode sends `answers` (array), all other modes send `text`

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Find or create session
    let session = sessionId
      ? await ChatSession.findOne({ _id: sessionId, userId: user._id })
      : await ChatSession.findOne({ userId: user._id, status: 'active' })
                         .sort({ updatedAt: -1 })

    if (!session) {
      session = await ChatSession.create({ userId: user._id })
    }

    // No stage yet → force assessment regardless of mode
    if (!user.storiStage) {
  if (session.mode !== 'assessment') {
    session.mode = 'assessment'
    session.assessmentGroupIndex = 0
    session.assessmentAnswers = []
    await session.save()
  }
  return handleAssessment(session, user, answers, res)
}

    switch (session.mode) {
      case 'triage':     return handleTriage(session, user, text,  fromOption, res)
      case 'tool':       return handleTool(session, user, text,  fromOption, res)
      case 'assessment': return handleAssessment(session, user, answers, res)
      case 'reflection': return handleReflection(session, user, text, res)
      case 'psychoed':   return handlePsychoed(session, user, text, res)
      default:           return handleTriage(session, user, text, res)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT
// ─────────────────────────────────────────────────────────────────────────────

// Send one group of 5 questions to the frontend
function sendAssessmentGroup(session, res, groupIndex) {
const gi = session.assessmentGroupIndex || 0
return res.json({
  sessionId:   session._id,
  mode:        'assessment',
  storiStage:  null,
  group:       gi + 1,
  totalGroups: 6,
  questions:   ASSESSMENT_SCREENS[gi],
  progress:    Math.round((gi / 6) * 100),
})
}

async function handleAssessment(session, user, answers, res) {
  // answers = [{ questionId, answer }] × 5  (one full group)
  if (!Array.isArray(answers) || answers.length === 0) {
    // Resend current group if no answers provided
    return sendAssessmentGroup(session, res, session.assessmentGroupIndex)
  }

  // Validate: 1–5 only
  const sanitised = answers.map(a => ({
    questionId: a.questionId,
    answer:     Math.min(5, Math.max(1, parseInt(a.answer) || 3)),
  }))

  // Accumulate
  session.assessmentAnswers.push(...sanitised)
  session.markModified('assessmentAnswers')

  const nextGroup = session.assessmentGroupIndex + 1

  // All 6 groups done → calculate stage
  if (nextGroup >= 6) {
    const { assignedStage, stageScores } = calculateStage(
      session.assessmentAnswers,
      questions,
    )

    await Assessment.create({
      userId:        user._id,
      answers:       session.assessmentAnswers,
      assignedStage,
      scores:        stageScores,
    })

    user.storiStage = assignedStage
    user.assessmentCompletedAt = new Date()
    await user.save()

    const rootId   = stageRoots[assignedStage]
    const rootNode = chatTree[rootId]

    session.mode                = 'triage'
    session.currentNodeId       = rootId
    session.assessmentAnswers   = []
    session.assessmentGroupIndex = 0
    await session.save()

    return res.json({
      mode:          'triage',
      stageAssigned: assignedStage,
      stageName:     STAGE_NAMES[assignedStage],
      reply:         `thank you for sharing that. based on your answers, you're at the ${STAGE_NAMES[assignedStage].toLowerCase()} stage of recovery. your tools are now unlocked — let's begin.`,
      options:       filterOptions(rootNode.options, assignedStage),
      sessionId:     session._id,
    })
  }

  // Send next group
  session.assessmentGroupIndex = nextGroup
  await session.save()
  return sendAssessmentGroup(session, res, nextGroup)
}

// ─────────────────────────────────────────────────────────────────────────────
// TRIAGE
// ─────────────────────────────────────────────────────────────────────────────

async function handleTriage(session, user, text,  fromOption, res) {
  if (!text) return res.status(400).json({ message: 'text required in triage mode' })

  // 1. Crisis keyword intercept — always first
 if (!fromOption && hasCrisisKeyword(text)) {
    session.currentNodeId = 'crisis_check'
    await session.save()
    const node = chatTree['crisis_check']
    return res.json({
      mode:    'triage',
      reply:   node.bot,
      options: node.options,
      isCrisisNode: true,
      sessionId: session._id,
    })
  }

  // 2. Soft self-harm keyword — inject article offer once per session
  if (!fromOption && hasSoftKeyword(text) && !session.selfHarmArticleOffered) {
    session.selfHarmArticleOffered = true
    await session.save()
    return res.json({
      mode:  'triage',
      reply: "i noticed you mentioned self-harm. whenever you're ready, there's an article that might help.",
      options: [
        { label: "i'd like to read it",  action: 'psychoed:self_harm', pendingTool: null },
        { label: "i'm okay, keep going", next: session.currentNodeId },
      ],
      sessionId: session._id,
    })
  }

  // 3. Get current node
  let node = chatTree[session.currentNodeId]
  if (!node) {
    const rootId = stageRoots[user.storiStage] || 'root_s1'
    session.currentNodeId = rootId
    await session.save()
    node = chatTree[rootId]
    return res.json({
      mode:    'triage',
      reply:   node.bot,
      options: filterOptions(node.options, user.storiStage),
      sessionId: session._id,
    })
  }

  // 4. Dynamic tool picker — build options at runtime
  if (session.currentNodeId === 'tool_picker') {
    const toolOptions = toolsConfig
      .filter(t => t.minStage <= user.storiStage)
      .map(t => ({ label: t.name, action: `launch:${t.id}` }))
    const chosen = toolOptions.find(o =>
      o.label.toLowerCase() === text.toLowerCase()
    )
    if (!chosen) {
      return res.json({
        mode:    'triage',
        reply:   node.bot,
        options: toolOptions,
        sessionId: session._id,
      })
    }
    return handleAction(chosen.action, null, session, user, res)
  }

  // 5. Match user text to a node option
  const visibleOptions = filterOptions(node.options, user.storiStage)
  const chosen = matchOption(visibleOptions, text)

  if (!chosen) {
    return res.json({
      mode:    'triage',
      reply:   node.bot,
      options: visibleOptions,
      sessionId: session._id,
    })
  }

  // 6. Track positive root signal (for reassessment threshold)
  if (session.currentNodeId.startsWith('root_')) {
    if (chosen.next === 'tool_picker' || (chosen.action && chosen.action !== 'end')) {
      session.progressSignals.positiveRootChoices += 1
    }
  }

  // 7. Route: action or next
  if (chosen.action) {
    return handleAction(chosen.action, chosen.pendingTool || null, session, user, res)
  }

 if (chosen.next) {
  const nextId = chosen.next === 'root_s1'
    ? (stageRoots[user.storiStage] || 'root_s1')
    : chosen.next
  session.currentNodeId = nextId
  await session.save()
  const nextNode = chatTree[nextId]
  return res.json({
    mode:    'triage',
    reply:   nextNode.bot,
    options: filterOptions(nextNode.options, user.storiStage),
    sessionId: session._id,
  })
}

  return res.status(500).json({ message: 'Option has neither next nor action' })
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION HANDLER
// ─────────────────────────────────────────────────────────────────────────────

async function handleAction(action, pendingTool, session, user, res) {
  if (action.startsWith('nav:')) {
  const nodeId = action.split(':')[1]
  session.currentNodeId = nodeId
  await session.save()
  const nextNode = chatTree[nodeId]
  return res.json({
    mode:    'triage',
    reply:   nextNode.bot,
    options: filterOptions(nextNode.options, user.storiStage),
    sessionId: session._id,
  })
 }
  // launch:<toolId>
  if (action.startsWith('launch:')) {
    const toolId = action.split(':')[1]

    // Reassessment
    if (toolId === 'assessment') {
      session.mode                 = 'assessment'
      session.assessmentGroupIndex = 0
      session.assessmentAnswers    = []
      await session.save()
      return sendAssessmentGroup(session, res, 0)
    }

    // Stage lock check
    const minStage = stageLocked[action]
    if (minStage && user.storiStage < minStage) {
      session.currentNodeId = 'tool_locked'
      await session.save()
      const node = chatTree['tool_locked']
      return res.json({
        mode:    'triage',
        reply:   node.bot,
        options: filterOptions(node.options, user.storiStage),
        sessionId: session._id,
      })
    }

    return launchTool(toolId, session, user, res)
  }

  // psychoed:<articleId>
  if (action.startsWith('psychoed:')) {
    const articleId = action.split(':')[1]
    const article   = psychoedContent.find(a => a.id === articleId)
    const config    = psychoedConfig.find(a => a.id === articleId)

    if (!article) return res.status(404).json({ message: 'Article not found' })

    session.mode          = 'psychoed'
    session.psychoedId    = articleId
    session.pendingToolId = pendingTool || null
    await session.save()

    return res.json({
      mode:    'psychoed',
      article: {
        id:               article.id,
        title:            article.title,
        readTime:         article.readTime,
        safeMessaging:    article.safeMessaging || false,
        sections:         article.sections,
        hasReflection:    config?.hasReflection     || false,
        reflectionPrompt: config?.reflectionPrompt  || null,
      },
      pendingToolId: session.pendingToolId,
      sessionId:     session._id,
    })
  }

  // end → reflection
 if (action === 'end') {
  session.mode = 'reflection'
  await session.save()
  return res.json({
    mode:    'reflection',
    reply:   "how are you feeling right now?",
    options: [
      { label: 'it helped' },
      { label: 'not sure yet' },
      { label: 'not really' },
    ],
    sessionId: session._id,
  })
}

  return res.status(400).json({ message: `Unknown action: ${action}` })
}

// ─────────────────────────────────────────────────────────────────────────────
// LAUNCH TOOL (shared by handleAction + startTool)
// ─────────────────────────────────────────────────────────────────────────────

async function launchTool(toolId, session, user, res) {
  const script = toolScripts[toolId]
  if (!script) return res.status(404).json({ message: `No script for tool: ${toolId}` })

  session.mode         = 'tool'
  session.activeToolId = toolId
  session.toolStep     = 0
  session.toolData     = {}
  await session.save()

  const step = script[0]
  return res.json({
    mode:      'tool',
    toolId,
    reply:     step.botMessage,
    options: step.options
  ? step.options.map(o => ({
      label: typeof o === 'string' ? o : o.text
    }))
  : [],
    inputType: step.inputType || 'text',
    sessionId: session._id,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL
// ─────────────────────────────────────────────────────────────────────────────

async function handleTool(session, user, text, fromOption, res) {
  // Crisis check first — interrupt tool
  if (!fromOption && hasCrisisKeyword(text)) {
    session.currentNodeId = 'crisis_check'
    session.mode          = 'triage'
    session.activeToolId  = null
    session.toolData      = {}
    user.lastCrisisAt     = new Date()
    await Promise.all([session.save(), user.save()])
    const node = chatTree['crisis_check']
    return res.json({
      mode:         'triage',
      reply:        node.bot,
      options:      node.options,
      isCrisisNode: true,
      sessionId:    session._id,
    })
  }

  const script = toolScripts[session.activeToolId]
  if (!script) return res.status(500).json({ message: 'No active tool script' })

  const step = script[session.toolStep]

  // Reprompt if choice step doesn't match — max 2 reprompts then skip
  if (step.inputType === 'choice' && step.options?.length) {
    const match = step.options.find(o => {
  const value = typeof o === 'string' ? o : o.text
  return (
    value.toLowerCase() === text.toLowerCase() ||
    text.toLowerCase().includes(value.toLowerCase().split(' ')[0])
  )
})
    if (!match) {
      session.toolData._reprompt = (session.toolData._reprompt || 0) + 1
      await session.save()
      if (session.toolData._reprompt < 2) {
        return res.json({
        mode:      'tool',
        reply:     "just tap one of the options below.",
        options: step.options
  ? step.options.map(o => ({
      label: typeof o === 'string' ? o : o.text
    }))
  : [],
        inputType: 'choice',
        sessionId: session._id,
      })
      }
      // After 2 reprompts: skip step and continue
    }
    session.toolData._reprompt = 0
    session.markModified('toolData')
  }

  // Save answer to toolData
  if (step.field) {
    session.toolData[step.field] = text
    session.markModified('toolData')
  }

  const nextIdx = session.toolStep + 1

  // Last step → save ToolEntry → reflection
  if (nextIdx >= script.length) {
    const toolId = session.activeToolId

    // Worry variants both save under 'worry' with a type field
    const savedToolId = (toolId === 'worryPractical' || toolId === 'worryHypothetical')
      ? 'worry' : toolId
    const toolType =
      toolId === 'worryPractical'    ? 'practical'
      : toolId === 'worryHypothetical' ? 'hypothetical'
      : undefined

    // If reviewOf is set, push diary entry to original ToolEntry
    // Otherwise create a new ToolEntry as normal
    if (session.reviewOfEntryId) {
      await ToolEntry.findOneAndUpdate(
        { _id: session.reviewOfEntryId, userId: user._id },
        { $push: { 'data.diary': { ...session.toolData, recordedAt: new Date() } } }
      )
      session.reviewOfEntryId = null
    } else {
      await ToolEntry.create({
        userId: user._id,
        toolId: savedToolId,
        data:   { ...session.toolData, ...(toolType ? { type: toolType } : {}) },
      })
    }

    // Track distinct tools used (for reassessment threshold)
    const existing = session.distinctToolsUsed || []
    if (!existing.includes(savedToolId)) {
      session.distinctToolsUsed = [...existing, savedToolId]
      session.markModified('distinctToolsUsed')
    }
    session.progressSignals.toolCompletions += 1
    session.mode          = 'reflection'
    session.toolStep      = 0
    session.pendingToolId = null
    session.markModified('distinctToolsUsed')     
    session.markModified('reviewOfEntryId')
    await session.save()

    const opener = reflectionOpeners[toolId]
                || reflectionOpeners[savedToolId]
                || "how are you feeling after that?"

    return res.json({
  mode:    'reflection',
  reply:   opener,
  options: [
    { label: 'it helped' },
    { label: 'not sure yet' },
    { label: 'not really' },
  ],
  sessionId: session._id,
})
  }

  // Advance step
  session.toolStep = nextIdx
  await session.save()
  const next = script[nextIdx]
  return res.json({
    mode:      'tool',
    reply:     next.botMessage,
    options: next.options
  ? next.options.map(o => ({
      label: typeof o === 'string' ? o : o.text
    }))
  : [],
    inputType: next.inputType || 'text',
    sessionId: session._id,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// PSYCHOED
// Article already sent when mode was set (in handleAction).
// This handler receives either:
//   - A reflection response (free text, if hasReflection: true)
//   - 'done' or 'skip' signals from the frontend
// ─────────────────────────────────────────────────────────────────────────────

async function handlePsychoed(session, user, text, res) {
  const config       = psychoedConfig.find(a => a.id === session.psychoedId)
  const hasReflection = config?.hasReflection || false

  // Save reflection if article has one and user wrote something real
  if (hasReflection && text && text !== 'done' && text !== 'skip') {
    await ToolEntry.create({
      userId: user._id,
      toolId: `psychoed_${session.psychoedId}`,
      data:   { reflection: text, articleId: session.psychoedId },
    })
    // Count toward distinct tools for reassessment
    const key      = `psychoed_${session.psychoedId}`
    const existing = session.distinctToolsUsed || []
    if (!existing.includes(key)) {
      session.distinctToolsUsed = [...existing, key]
      session.markModified('distinctToolsUsed')
    }
  }

  // Offer pending tool if user hasn't skipped it
  const pendingToolId = session.pendingToolId
  if (pendingToolId && text !== 'skip_tool') {
    const toolName = toolsConfig.find(t => t.id === pendingToolId)?.name || pendingToolId
    session.mode          = 'triage'
    session.currentNodeId = stageRoots[user.storiStage] || 'root_s1'
    session.psychoedId    = null
    session.pendingToolId = null
    await session.save()

    return res.json({
      mode:  'triage',
      reply: `ready to try the ${toolName}?`,
      options: [
        { label: `yes — open ${toolName}`, action: `launch:${pendingToolId}` },
        { label: "that's enough for today", action: 'end' },
      ],
      sessionId: session._id,
    })
  }

  // No pending tool — go to reflection
  session.mode          = 'reflection'
  session.psychoedId    = null
  session.pendingToolId = null
  await session.save()

  return res.json({
  mode:    'reflection',
  reply:   "how are you feeling after reading that?",
  options: [
    { label: 'better' },
    { label: 'about the same' },
    { label: 'not great' },
  ],
  sessionId: session._id,
})
}

// ─────────────────────────────────────────────────────────────────────────────
// REFLECTION
// ─────────────────────────────────────────────────────────────────────────────

async function handleReflection(session, user, text, res) {
  if (text === 'it helped' || text === 'better') {   
    session.progressSignals.reflectionPositive += 1
  }

  // Reassessment thresholds
  const distinct   = (session.distinctToolsUsed || []).length
  const threshold  = user.storiStage === 5 ? 1 : 2
  const readyToReassess =
    distinct >= threshold ||
    session.progressSignals.positiveRootChoices >= 3 ||
    session.progressSignals.reflectionPositive  >= 4

  const rootId = stageRoots[user.storiStage] || 'root_s1'
  session.mode          = 'triage'
  session.currentNodeId = rootId
  await session.save()

  if (readyToReassess) {
    session.progressSignals.positiveRootChoices = 0
    session.progressSignals.reflectionPositive  = 0
    session.distinctToolsUsed                   = []
    session.markModified('distinctToolsUsed')
    const reassessNode    = chatTree['reassess']
    session.currentNodeId = 'reassess'
    await session.save()
    return res.json({
      mode:               'triage',
      reply:              reassessNode.bot,
      options:            reassessNode.options,
      reassessmentReady:  true,
      sessionId:          session._id,
    })
  }

  const rootNode = chatTree[rootId]
return res.json({
  mode:    'triage',
  reply:   "well done for working through that. what would you like to do now?",
  options: filterOptions(rootNode.options, user.storiStage),
  sessionId: session._id,
})
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Remove options the user's stage hasn't unlocked yet
function filterOptions(options, stage) {
  if (!options || options === '__dynamic__') return options
  return options.filter(opt => {
    if (!opt.action) return true
    const min = stageLocked[opt.action]
    return !min || stage >= min
  })
}

// Match user's text to a visible option
function matchOption(options, text) {
  if (!options || options === '__dynamic__') return null
  const t = text.toLowerCase().trim()
  return options.find(o =>
    o.label.toLowerCase() === t ||
    t.includes(o.label.toLowerCase().split(' ')[0]) && o.label.toLowerCase().split(' ')[0].length > 2
  ) || null
}

// ─────────────────────────────────────────────────────────────────────────────
// GET SESSION — GET /api/chat/session
// ─────────────────────────────────────────────────────────────────────────────

async function getSession(req, res) {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    let session = await ChatSession.findOne({ userId: user._id, status: 'active' })
                                   .sort({ updatedAt: -1 })

    // No stage yet → start assessment
    if (!user.storiStage) {
      if (!session) session = await ChatSession.create({ userId: user._id })
      session.mode                 = 'assessment'
      session.assessmentGroupIndex = 0
      session.assessmentAnswers    = []
      await session.save()
      return res.json({
        sessionId:   session._id,
        mode:        'assessment',
        storiStage:  null,
        group:       1,
        totalGroups: 6,
        questions:   ASSESSMENT_SCREENS[0],
        progress:    0,
      })
    }

    if (!session) session = await ChatSession.create({ userId: user._id })

    // Resume mid-tool info for frontend modal
    const resumeTool = session.mode === 'tool' ? {
      toolId:      session.activeToolId,
      stepCurrent: session.toolStep,
      stepsTotal:  toolScripts[session.activeToolId]?.length,
    } : null

    const node = chatTree[session.currentNodeId]

    return res.json({
      sessionId:     session._id,
      mode:          session.mode,
      currentNodeId: session.currentNodeId,
      storiStage:    user.storiStage,
      reply:         node?.bot    || null,
      options:       node ? filterOptions(node.options, user.storiStage) : [],
      messages:      session.messages?.slice(-50) || [],
      resumeTool,
      lastCrisisAt:  user.lastCrisisAt,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// RESET TOOL — POST /api/chat/reset-tool
// Called when user dismisses resume modal and wants to start fresh
// ─────────────────────────────────────────────────────────────────────────────

async function resetTool(req, res) {
  try {
    const user    = await User.findById(req.user.userId)
    const session = await ChatSession.findById(req.body.sessionId)
    if (!session) return res.status(404).json({ message: 'Session not found' })

    const rootId = stageRoots[user.storiStage] || 'root_s1'
    session.mode          = 'triage'
    session.currentNodeId = rootId
    session.activeToolId  = null
    session.toolStep      = 0
    session.toolData      = {}
    await session.save()

    const node = chatTree[rootId]
    return res.json({
      ok:      true,
      reply:   node.bot,
      options: filterOptions(node.options, user.storiStage),
    })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// START TOOL — POST /api/chat/start-tool
// Called directly from the Tools Library screen
// ─────────────────────────────────────────────────────────────────────────────

async function startTool(req, res) {
  try {
    const { toolId, sessionId, reviewOf } = req.body
    // reviewOf — optional ToolEntry _id. When present, completion pushes to
    // that entry's data.diary array instead of creating a new ToolEntry.
    // Used by: exposureDiary (triggered from library on a past exposure entry)
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const tool = toolsConfig.find(t => t.id === toolId)
    if (!tool) return res.status(404).json({ message: 'Tool not found' })
    if (user.storiStage < tool.minStage) {
      return res.status(403).json({ message: 'Tool not unlocked at your current stage' })
    }

    let session = sessionId
      ? await ChatSession.findById(sessionId)
      : await ChatSession.findOne({ userId: user._id, status: 'active' })
                         .sort({ updatedAt: -1 })
    if (!session) session = await ChatSession.create({ userId: user._id })

    // Store reviewOf so handleTool can push to original entry on completion
    session.reviewOfEntryId = reviewOf || null

    return launchTool(toolId, session, user, res)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// START ASSESSMENT — POST /api/chat/start-assessment
// Called when user explicitly requests reassessment from chat tree
// ─────────────────────────────────────────────────────────────────────────────

async function startAssessment(req, res) {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    let session = await ChatSession.findOne({ userId: user._id, status: 'active' })
                                   .sort({ updatedAt: -1 })
    if (!session) session = await ChatSession.create({ userId: user._id })

    session.mode                 = 'assessment'
    session.assessmentGroupIndex = 0
    session.assessmentAnswers    = []
    await session.save()

    return sendAssessmentGroup(session, res, 0)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  sendMessage,
  getSession,
  resetTool,
  startTool,
  startAssessment,
}