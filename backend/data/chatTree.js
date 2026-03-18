// // data/chatTree.js
// //
// // ─────────────────────────────────────────────────────────────────────────────
// // HOW THE CONTROLLER USES THIS FILE
// // ─────────────────────────────────────────────────────────────────────────────
// //
// // 1. On every message, check crisisKeywords first.
// //    If match → session.nodeId = 'crisis_check'
// //
// //    Also check selfHarmSoftKeywords (see export below):
// //    If match AND current node is NOT already in crisis flow →
// //      inject a gentle prompt before continuing:
// //      bot: "i noticed you mentioned self-harm. whenever you're ready, there's an article that might help."
// //      options: [
// //        { label: "i'd like to read it", action: 'psychoed:self_harm', pendingTool: null },
// //        { label: "i'm okay, keep going", next: <resume current node> }
// //      ]
// //
// // 2. On session start, pick root from stageRoots[user.currentStage].
// //
// // 3. Each user choice sends back the option label.
// //    Controller matches to current node:
// //      opt.next   → session.nodeId = opt.next, send next bot message
// //      opt.action → execute action, end triage mode
// //
// // 4. Actions:
// //    'launch:<toolId>'      → session.mode = 'tool', session.toolId = toolId
// //    'launch:assessment'    → session.mode = 'assessment'
// //    'end'                  → session.mode = 'reflection'
// //    'psychoed:<articleId>' → session.mode = 'psychoed', session.psychoedId = articleId
// //                             session.pendingToolId = the tool this article relates to (or null)
// //                             After article (+ optional reflection), controller offers:
// //                               "ready to try [toolName] now?" → launches pendingToolId
// //                               "that's enough for today"      → action: 'end'
// //
// // 5. tool_picker options are '__dynamic__' — controller builds them at runtime:
// //    toolsConfig.filter(t => t.minStage <= user.currentStage)
// //    .map(t => ({ label: t.name, action: `launch:${t.id}` }))
// //
// // 6. Before sending any node, filter options by stage:
// //    node.options.filter(opt =>
// //      !opt.action ||
// //      !stageLocked[opt.action] ||
// //      stageLocked[opt.action] <= user.currentStage
// //    )
// //    Also manually filter 'avoiding something i'm scared of' in anxious_opening at stage < 4.
// //
// // 7. After each reflection, check reassessment thresholds:
// //    session.distinctToolsUsed >= 2 (or >= 1 at stage 5)
// //    OR session.positiveRootChoices >= 3
// //    OR session.positiveReflections >= 4
// //    If met → session.nodeId = 'reassess'
// //    Note: psychoed articles with hasReflection:true count toward distinctToolsUsed.
// //
// // ─────────────────────────────────────────────────────────────────────────────

// const chatTree = {

//   // ═══════════════════════════════════════════════════════════════════════════
//   // CRISIS — keyword-intercepted before tree lookup
//   // ═══════════════════════════════════════════════════════════════════════════

//   crisis_check: {
//     bot: "i want to check in — are you having thoughts of harming yourself?",
//     options: [
//       { label: "yes",           next: 'crisis_resources' },
//       { label: "not like that", next: 'crisis_distress' },
//     ],
//   },

//   crisis_resources: {
//     bot: "thank you for telling me.\n\n📞 Samaritans: 116 123 (free, 24/7)\nText HELLO to 85258\nCall 999 if you are in immediate danger.\n\ni'll be here when you're ready.",
//     options: [
//       { label: "i want to keep talking",              next: 'crisis_talk' },
//       { label: "i want to read about suicidal thoughts", action: 'psychoed:suicide', pendingTool: null },
//       { label: "okay, i'll reach out",                action: 'end' },
//     ],
//   },

//   crisis_talk: {
//   bot: "what's been building up for you?",
//   options: [
//     { label: "try breathing",         action: 'launch:breathing' },
//     { label: "try grounding",         action: 'launch:grounding' },
//     { label: "read about self-harm",  action: 'psychoed:self_harm', pendingTool: null },
//     { label: "i don't feel safe",     next: 'crisis_gateway' },
//   ],
// },


//   // GATEWAY — reached from tree nodes when user signals things are very dark.
//   // Asks directly once. Routes to resources or back into supportive flow.
//   // ─────────────────────────────────────────────────────────────────────────
//   crisis_gateway: {
//     bot: "i'm glad you said something.\n\nare you having thoughts of self-harm or suicide?",
//     options: [
//       { label: "yes",           next: 'crisis_resources' },
//       { label: "not like that", next: 'crisis_distress' },
//     ],
//   },

//   crisis_distress: {
//     bot: "okay — but it sounds like things are hard. what would help most right now?",
//     options: [
//       { label: "something to calm me down",    next: 'anxious_acute' },
//       { label: "talk through how i'm feeling", next: 'low_opening' },
//     ],
//   },


//   // ═══════════════════════════════════════════════════════════════════════════
//   // STAGE ROOTS — thin, one question each
//   // ═══════════════════════════════════════════════════════════════════════════

//   root_s1: {
//     bot: "hey. how are you doing today?",
//     options: [
//       { label: "really struggling",       next: 'low_opening' },
//       { label: "anxious or overwhelmed",  next: 'anxious_opening' },
//       { label: "just checking in",        action: 'launch:checklist' },
//     ],
//   },

//   root_s2: {
//     bot: "hey. what's on your mind today?",
//     options: [
//       { label: "struggling or feeling low",  next: 'low_opening' },
//       { label: "anxious or worried",         next: 'anxious_opening' },
//       { label: "checking in",                action: 'launch:checklist' },
//       { label: "i know what i want to do",   next: 'tool_picker' },
//     ],
//   },

//   root_s3: {
//     bot: "hey. what would you like to work on today?",
//     options: [
//       { label: "struggling — need support",  next: 'low_opening' },
//       { label: "anxious or worried",         next: 'anxious_opening' },
//       { label: "checking in",                action: 'launch:checklist' },
//       { label: "i know what i want to do",   next: 'tool_picker' },
//     ],
//   },

//   root_s4: {
//     bot: "hey. what are you working on today?",
//     options: [
//       { label: "struggling — need support",   next: 'low_opening' },
//       { label: "anxiety or avoidance",        next: 'anxious_opening' },
//       { label: "checking in",                 action: 'launch:checklist' },
//       { label: "i know what i want to do",    next: 'tool_picker' },
//     ],
//   },

//   root_s5: {
//     bot: "hey. what would you like to focus on today?",
//     options: [
//       { label: "feeling low or struggling",  next: 'low_opening' },
//       { label: "anxious or worried",         next: 'anxious_opening' },
//       { label: "checking in",                action: 'launch:checklist' },
//       { label: "i know what i want to do",   next: 'tool_picker' },
//     ],
//   },


//   // ═══════════════════════════════════════════════════════════════════════════
//   // FEELING LOW — full depth (max 3 questions)
//   // ═══════════════════════════════════════════════════════════════════════════

//   // Q1
//   low_opening: {
//     bot: "what does that feel like right now?",
//     options: [
//       { label: "flat, empty, no energy",         next: 'low_flat' },
//       { label: "sad or distressed",              next: 'low_distressed' },
//       { label: "negative thoughts taking over",  next: 'low_thoughts' },
//       { label: "something difficult happened",   next: 'low_situation' },
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//     ],
//   },

//   // PATH A — flat / no energy ──────────────────────────────────────────────
//   // Q2
//   low_flat: {
//     bot: "when you're flat and low on energy, small things can break the cycle. what feels most possible right now?",
//     options: [
//       { label: "check what basics i've managed today",  action: 'launch:checklist' },
//       { label: "remind myself of my strengths",          action: 'launch:strengths' },              // stage 2+
//       { label: "plan some activities for the week",      action: 'launch:behaviouralActivation' },  // stage 4+
//       { label: "explain how activity affects mood",      action: 'psychoed:behavioural_activation', pendingTool: 'behaviouralActivation' }, // stage 4+
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "nothing feels possible right now",       next: 'low_nothing' },
//     ],
//   },

//   // Q3 — terminal
//   low_nothing: {
//     bot: "that's okay. the smallest thing counts right now — can you do one of these?",
//     options: [
//       { label: "3 slow breaths",        action: 'launch:breathing' },
//       { label: "name 5 things i see",   action: 'launch:grounding' },
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//     ],
//   },

//   // PATH B — sad / distressed ──────────────────────────────────────────────
//   // Q2
//   low_distressed: {
//     bot: "is there something specific that happened, or more of a general heaviness?",
//     options: [
//       { label: "something specific happened",         next: 'low_situation' },
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "general heaviness, nothing specific", next: 'low_general_heaviness' },
//     ],
//   },

//   // Q3 — terminal
//   low_general_heaviness: {
//     bot: "what would help most — something to ground you in the present, or something to sit with how you're feeling?",
//     options: [
//       { label: "ground me in the present",  action: 'launch:grounding' },
//       { label: "slow my breathing first",   action: 'launch:breathing' },
//       { label: "remind me of my strengths", action: 'launch:strengths' }, // stage 2+
//       { label: "things feel really dark",   next: 'crisis_gateway' },
//     ],
//   },

//   // PATH C — negative thoughts ─────────────────────────────────────────────
//   // Q2
//   low_thoughts: {
//     bot: "what are the thoughts doing?",
//     options: [
//       { label: "criticising me — i keep attacking myself",       action: 'launch:cognitiveRestructuring' }, // stage 3+
//       { label: "linked to something that happened",              next: 'low_situation' },
//       { label: "catastrophising — imagining the worst",          action: 'launch:cognitiveRestructuring' }, // stage 3+
//       { label: "looping — the same thought keeps coming back",   next: 'low_looping' },
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "i don't really understand why i think this way", action: 'psychoed:nats', pendingTool: 'cognitiveRestructuring' }, // stage 2+
//     ],
//   },

//   // Q3 — terminal (worry bridge)
//   low_looping: {
//     bot: "is there something you can actually do about what you're worried about, or is it more of a what-if?",
//     options: [
//       { label: "yes — i can take a step",               action: 'launch:worryPractical' },    // stage 3+
//       { label: "no — it's a what-if i can't control",   action: 'launch:worryHypothetical' }, // stage 3+
//       { label: "i'm not sure — explain the difference",  action: 'psychoed:worry', pendingTool: 'worryHypothetical' }, // stage 3+
//       { label: "things feel really dark",               next: 'crisis_gateway' },
//     ],
//   },

//   // PATH D — something happened ────────────────────────────────────────────
//   // Q2–3 terminal
//   low_situation: {
//     bot: "do you want to understand what happened and why you reacted that way, or work through the thoughts it triggered?",
//     options: [
//       { label: "understand the situation",           action: 'launch:abc' },                                            // stage 2+
//       { label: "explain the ABC model to me first",  action: 'psychoed:abc_model', pendingTool: 'abc' },               // stage 2+
//       { label: "work through the thoughts",          action: 'launch:cognitiveRestructuring' },                         // stage 3+
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "explain how to challenge thoughts",  action: 'psychoed:cognitive_restructuring', pendingTool: 'cognitiveRestructuring' }, // stage 3+
//     ],
//   },


//   // ═══════════════════════════════════════════════════════════════════════════
//   // ANXIOUS — full depth (max 3 questions)
//   // ═══════════════════════════════════════════════════════════════════════════

//   // Q1
//   anxious_opening: {
//     bot: "what's the anxiety like?",
//     options: [
//       { label: "a specific worry i keep thinking about",  next: 'anxious_worry' },
//       { label: "overwhelmed or panicking right now",      next: 'anxious_acute' },
//       { label: "avoiding something i'm scared of",        next: 'anxious_avoidance' }, // stage 4+ — controller filters
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "general tension, on edge",                next: 'anxious_general' },
//     ],
//   },

//   // PATH A — specific worry ────────────────────────────────────────────────
//   // Q2
//   anxious_worry: {
//     bot: "how long has this worry been around?",
//     options: [
//       { label: "just started today",      next: 'worry_bridge' },
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "been going for a while",  next: 'anxious_worry_established' },
//     ],
//   },

//   // Q3 — terminal
//   anxious_worry_established: {
//     bot: "when a worry keeps coming back, there are usually two types. is there something you can actually do about it, or is it a what-if you can't control?",
//     options: [
//       { label: "i can take a concrete step",        action: 'launch:worryPractical' },    // stage 3+
//       { label: "it's a what-if — nothing to do",    action: 'launch:worryHypothetical' }, // stage 3+
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "i'm not sure — explain the types",  action: 'psychoed:worry', pendingTool: 'worryHypothetical' }, // stage 3+
//     ],
//   },

//   // PATH B — acute / overwhelmed ───────────────────────────────────────────
//   // Q2 — terminal
//   anxious_acute: {
//     bot: "let's bring you back to the present first. which feels right?",
//     options: [
//       { label: "breathing exercise",    action: 'launch:breathing' },
//       { label: "grounding exercise",    action: 'launch:grounding' },
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//     ],
//   },

//   // PATH C — avoidance (stage 4+ only) ─────────────────────────────────────
//   // Q2 — terminal
//   anxious_avoidance: {
//     bot: "what kind of avoidance?",
//     options: [
//       { label: "a specific place, situation or thing i'm scared of",  action: 'launch:exposure' },              // stage 4+
//       { label: "why does avoiding things make it worse?",             action: 'psychoed:avoidance', pendingTool: 'exposure' }, // stage 4+
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "activities and things i used to do",                  action: 'launch:behaviouralActivation' }, // stage 4+
//     ],
//   },

//   // PATH D — general tension ───────────────────────────────────────────────
//   // Q2
//   anxious_general: {
//     bot: "is the tension linked to thoughts — things you're telling yourself — or more physical?",
//     options: [
//       { label: "linked to thoughts",  action: 'launch:cognitiveRestructuring' }, // stage 3+
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "more physical",       next: 'anxious_physical' },
//     ],
//   },

//   // Q3 — terminal
//   anxious_physical: {
//     bot: "what sounds right?",
//     options: [
//       { label: "breathing exercise",  action: 'launch:breathing' },
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "grounding exercise",  action: 'launch:grounding' },
//     ],
//   },


//   // ═══════════════════════════════════════════════════════════════════════════
//   // WORRY BRIDGE
//   // Shared terminal node reached from anxious_worry (fresh) and low_looping.
//   // Controller saves type: 'practical' | 'hypothetical' on the ToolEntry.
//   // ═══════════════════════════════════════════════════════════════════════════

//   worry_bridge: {
//     bot: "is there something you can actually do about this worry today?",
//     options: [
//       { label: "yes — i can take a step",                action: 'launch:worryPractical' },    // stage 3+
//       { label: "no — it's a what-if i can't control",    action: 'launch:worryHypothetical' }, // stage 3+
//       { label: "i don't feel safe", next: 'crisis_gateway' },
//       { label: "i'm not sure — explain the difference",  action: 'psychoed:worry', pendingTool: 'worryHypothetical' }, // stage 3+
//     ],
//   },


//   // ═══════════════════════════════════════════════════════════════════════════
//   // TOOL PICKER — shortcut for users who know what they want
//   // ═══════════════════════════════════════════════════════════════════════════

//   tool_picker: {
//     bot: "which tool do you want to use?",
//     options: '__dynamic__',
//     // controller builds at runtime:
//     // toolsConfig
//     //   .filter(t => t.minStage <= user.currentStage)
//     //   .map(t => ({ label: t.name, action: `launch:${t.id}` }))
//   },

//   tool_locked: {
//     bot: "that tool isn't available at your stage yet — it will unlock as you progress.\n\nwant to see what's available now?",
//     options: [
//       { label: "yes — show me", next: 'tool_picker' },
//       { label: "okay",          action: 'end' },
//     ],
//   },


//   // ═══════════════════════════════════════════════════════════════════════════
//   // REASSESSMENT — injected by controller after reflection, not user-navigated
//   // ═══════════════════════════════════════════════════════════════════════════

//   reassess: {
//     bot: "you've made real progress. want to do a quick check-in to see where you are now? it takes about 5 minutes.",
//     options: [
//       { label: "yes — let's do it",  action: 'launch:assessment' },
//       { label: "not right now",       action: 'end' },
//     ],
//   },

// }


// const stageRoots = {
//   1: 'root_s1',
//   2: 'root_s2',
//   3: 'root_s3',
//   4: 'root_s4',
//   5: 'root_s5',
// }

// const crisisKeywords = [
//   'end it', 'end my life', 'kill myself', 'not worth living',
//   'want to die', 'wish i was dead', 'suicide', 'suicidal',
//   'take my life', 'self harm', 'self-harm', 'hurt myself',
//   'cut myself', "can't go on", 'cannot go on', 'no point going on',
// ]

// // Softer keywords — do NOT trigger crisis_check.
// // Instead, inject a gentle offer to read the self-harm article
// // before continuing with the current chat flow.
// // Only fire once per session (session.selfHarmArticleOffered = true after first trigger).
// const selfHarmSoftKeywords = [
//   'used to self harm', 'used to hurt myself', 'used to cut',
//   'history of self harm', 'i self harm sometimes', 'i sometimes hurt',
//   'scars', 'urge to hurt', 'urge to cut',
// ]

// // Controller filters node options before sending.
// // Applies to both launch: and psychoed: actions.
// // psychoed minStage mirrors the tool it relates to — only show when tool is also unlocked.
// const stageLocked = {
//   // tools
//   'launch:abc':                    2,
//   'launch:strengths':              2,
//   'launch:cognitiveRestructuring': 3,
//   'launch:worryPractical':         3,
//   'launch:worryHypothetical':      3,
//   'launch:problemSolving':         3,
//   'launch:behaviouralActivation':  4,
//   'launch:exposure':               4,
//   'launch:smartGoals':             5,

//   // psychoed — same minStage as the tool they pair with
//   'psychoed:nats':                    2,
//   'psychoed:abc_model':               2,
//   'psychoed:worry':                   3,
//   'psychoed:cognitive_restructuring': 3,
//   'psychoed:behavioural_activation':  4,
//   'psychoed:avoidance':               4,
// }

// module.exports = { chatTree, stageRoots, crisisKeywords, selfHarmSoftKeywords, stageLocked }

// data/chatTree.js

const chatTree = {

  // ═══════════════════════════════════════════════════════════════════════════
  // CRISIS
  // ═══════════════════════════════════════════════════════════════════════════

  crisis_check: {
    bot: "i want to check in — are you having thoughts of harming yourself?",
    options: [
      { label: "yes",           next: 'crisis_resources' },
      { label: "not like that", next: 'crisis_distress' },
    ],
  },

  crisis_resources: {
    bot: "thank you for telling me.\n\n📞 Samaritans: 116 123 (free, 24/7)\nText HELLO to 85258\nCall 999 if you are in immediate danger.\n\ni'll be here when you're ready.",
    options: [
      { label: "i want to keep talking",                 next: 'crisis_talk' },
      { label: "i want to read about suicidal thoughts", action: 'psychoed:suicide', pendingTool: null },
      { label: "okay, i'll reach out",                   action: 'end' },
    ],
  },

  crisis_talk: {
    bot: "what's been building up for you?",
    options: [
      { label: "try breathing",        action: 'launch:breathing' },
      { label: "try grounding",        action: 'launch:grounding' },
      { label: "read about self-harm", action: 'psychoed:self_harm', pendingTool: null },
      { label: "i don't feel safe",    next: 'crisis_gateway' },
    ],
  },

  // Reached when user taps "i don't feel safe" from within the tree
  crisis_gateway: {
    bot: "i want to check in with you — are you having thoughts of self-harm or suicide?",
    options: [
      { label: "yes",           next: 'crisis_resources' },
      { label: "not like that", next: 'crisis_distress' },
    ],
  },

  crisis_distress: {
    bot: "okay — but it sounds like things are hard. what would help most right now?",
    options: [
      { label: "something to calm me down",    next: 'calm_now' },
      { label: "talk through how i'm feeling", next: 'low_opening' },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE ROOTS
  // ═══════════════════════════════════════════════════════════════════════════

  root_s1: {
    bot: "hey. how are you doing today?",
    options: [
      { label: "really struggling",      next: 'low_opening' },
      { label: "anxious or overwhelmed", next: 'anxious_opening' },
      { label: "just checking in",       action: 'launch:checklist' },
    ],
  },

  root_s2: {
    bot: "hey. what's on your mind today?",
    options: [
      { label: "struggling or feeling low", next: 'low_opening' },
      { label: "anxious or worried",        next: 'anxious_opening' },
      { label: "checking in",               action: 'launch:checklist' },
    ],
  },

  root_s3: {
    bot: "hey. what would you like to work on today?",
    options: [
      { label: "struggling — need support", next: 'low_opening' },
      { label: "anxious or worried",        next: 'anxious_opening' },
      { label: "checking in",               action: 'launch:checklist' },
    ],
  },

  root_s4: {
    bot: "hey. what are you working on today?",
    options: [
      { label: "struggling — need support", next: 'low_opening' },
      { label: "anxiety or avoidance",      next: 'anxious_opening' },
      { label: "checking in",               action: 'launch:checklist' },
    ],
  },

  root_s5: {
    bot: "hey. what would you like to focus on today?",
    options: [
      { label: "feeling low or struggling", next: 'low_opening' },
      { label: "anxious or worried",        next: 'anxious_opening' },
      { label: "checking in",               action: 'launch:checklist' },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // FEELING LOW
  // ═══════════════════════════════════════════════════════════════════════════

  low_opening: {
    bot: "what does that feel like right now?",
    options: [
      { label: "flat, empty, no energy",        next: 'low_flat' },
      { label: "sad or distressed",             next: 'low_distressed' },
      { label: "negative thoughts taking over", next: 'low_thoughts' },
      { label: "something difficult happened",  next: 'low_situation' },
      { label: "i don't feel safe",             next: 'crisis_gateway' },
    ],
  },

  low_flat: {
    bot: "when you're flat and low on energy, small things can break the cycle. what feels most possible right now?",
    options: [
      { label: "check what basics i've managed today", action: 'launch:checklist' },
      { label: "remind myself of my strengths",         action: 'launch:strengths' },             // stage 2+
      { label: "plan some activities for the week",     action: 'launch:behaviouralActivation' }, // stage 4+
      { label: "explain how activity affects mood",     action: 'psychoed:behavioural_activation', pendingTool: 'behaviouralActivation' }, // stage 4+
      { label: "nothing feels possible right now",      next: 'low_nothing' },
      { label: "i don't feel safe",                     next: 'crisis_gateway' },
    ],
  },

  low_nothing: {
    bot: "that's okay. the smallest thing counts right now — can you do one of these?",
    options: [
      { label: "3 slow breaths",      action: 'launch:breathing' },
      { label: "name 5 things i see", action: 'launch:grounding' },
      { label: "i don't feel safe",   next: 'crisis_gateway' },
    ],
  },

  low_distressed: {
    bot: "is there something specific that happened, or more of a general heaviness?",
    options: [
      { label: "something specific happened",         next: 'low_situation' },
      { label: "general heaviness, nothing specific", next: 'low_general_heaviness' },
      { label: "i don't feel safe",                   next: 'crisis_gateway' },
    ],
  },

  low_general_heaviness: {
    bot: "what would help most — something to ground you, or a reminder of your strengths?",
    options: [
      { label: "ground me in the present",  next: 'calm_now' },
      { label: "remind me of my strengths", action: 'launch:strengths' }, // stage 2+
      { label: "things feel really dark",   next: 'crisis_gateway' },
    ],
  },

  low_thoughts: {
    bot: "what are the thoughts doing?",
    options: [
      { label: "attacking or catastrophising — my thoughts are very negative", action: 'launch:cognitiveRestructuring' }, // stage 3+ (merges two old options)
      { label: "looping — the same thought keeps coming back",                 next: 'worry_type' },
      { label: "linked to something that happened",                            next: 'low_situation' },
      { label: "i don't really understand why i think this way",               action: 'psychoed:nats', pendingTool: 'cognitiveRestructuring' }, // stage 2+
      { label: "i don't feel safe",                                            next: 'crisis_gateway' },
    ],
  },

  low_situation: {
    bot: "do you want to understand what happened and why you reacted that way, or work through the thoughts it triggered?",
    options: [
      { label: "understand the situation",           action: 'launch:abc' },                                                             // stage 2+
      { label: "explain the ABC model to me first",  action: 'psychoed:abc_model', pendingTool: 'abc' },                                // stage 2+
      { label: "work through the thoughts",          action: 'launch:cognitiveRestructuring' },                                          // stage 3+
      { label: "explain how to challenge thoughts",  action: 'psychoed:cognitive_restructuring', pendingTool: 'cognitiveRestructuring' }, // stage 3+
      { label: "i don't feel safe",                  next: 'crisis_gateway' },
      { label: "i need something different",         next: 'root_s1' },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // ANXIOUS
  // ═══════════════════════════════════════════════════════════════════════════

  anxious_opening: {
    bot: "what's the anxiety like?",
    options: [
      { label: "a specific worry i keep thinking about", next: 'anxious_worry' },
      { label: "overwhelmed or panicking right now",     next: 'calm_now' },
      { label: "avoiding something i'm scared of",       action: 'nav:anxious_avoidance' }, // stage 4+ via stageLocked
      { label: "general tension, on edge",               next: 'anxious_general' },
      { label: "i don't feel safe",                      next: 'crisis_gateway' },
    ],
  },

  anxious_worry: {
    bot: "how long has this worry been around?",
    options: [
      { label: "just started today",     next: 'worry_type' },
      { label: "been going for a while", next: 'worry_type' },
      { label: "i don't feel safe",      next: 'crisis_gateway' },
    ],
  },

  anxious_avoidance: {
    bot: "what kind of avoidance?",
    options: [
      { label: "a specific place, situation or thing i'm scared of", action: 'launch:exposure' },              // stage 4+
      { label: "why does avoiding things make it worse?",            action: 'psychoed:avoidance', pendingTool: 'exposure' }, // stage 4+
      { label: "activities and things i used to do",                 action: 'launch:behaviouralActivation' }, // stage 4+
      { label: "i don't feel safe",                                  next: 'crisis_gateway' },
      { label: "i need something different",                         next: 'root_s1' },
    ],
  },

  anxious_general: {
    bot: "is the tension linked to thoughts, or more physical — tension in your body?",
    options: [
      { label: "linked to thoughts", action: 'launch:cognitiveRestructuring' }, // stage 3+
      { label: "more physical",       next: 'calm_now' },
      { label: "i don't feel safe",   next: 'crisis_gateway' },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED NODES
  // ═══════════════════════════════════════════════════════════════════════════

  // Replaces: anxious_acute, anxious_physical, and the breathing/grounding
  // terminal in crisis_distress. One node, used everywhere.
  calm_now: {
    bot: "which feels right?",
    options: [
      { label: "breathing exercise", action: 'launch:breathing' },
      { label: "grounding exercise", action: 'launch:grounding' },
      { label: "i don't feel safe",  next: 'crisis_gateway' },
    ],
  },

  // Replaces: low_looping, worry_bridge, anxious_worry_established.
  // All three asked the same question and led to the same two tools.
  worry_type: {
    bot: "is there something you can actually do about this worry, or is it a what-if you can't control?",
    options: [
      { label: "i can take a concrete step",        action: 'launch:worryPractical' },    // stage 3+
      { label: "it's a what-if — nothing to do",    action: 'launch:worryHypothetical' }, // stage 3+
      { label: "i'm not sure — explain the types",  action: 'psychoed:worry', pendingTool: 'worryHypothetical' }, // stage 3+
      { label: "i don't feel safe",                 next: 'crisis_gateway' },
      { label: "i need something different",        next: 'root_s1' },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // UTILITY
  // ═══════════════════════════════════════════════════════════════════════════

  tool_picker: {
    bot: "which tool do you want to use?",
    options: '__dynamic__',
  },

  tool_locked: {
    bot: "that tool isn't available at your stage yet — it will unlock as you progress.\n\nwant to see what's available now?",
    options: [
      { label: "yes — show me", next: 'tool_picker' },
      { label: "okay",          action: 'end' },
    ],
  },

  reassess: {
    bot: "you've made real progress. want to do a quick check-in to see where you are now? it takes about 5 minutes.",
    options: [
      { label: "yes — let's do it", action: 'launch:assessment' },
      { label: "not right now",      action: 'end' },
    ],
  },

}


const stageRoots = {
  1: 'root_s1',
  2: 'root_s2',
  3: 'root_s3',
  4: 'root_s4',
  5: 'root_s5',
}

const crisisKeywords = [
  'end it', 'end my life', 'kill myself', 'not worth living',
  'want to die', 'wish i was dead', 'suicide', 'suicidal',
  'take my life', 'self harm', 'self-harm', 'hurt myself',
  'cut myself', "can't go on", 'cannot go on', 'no point going on',
]

const selfHarmSoftKeywords = [
  'used to self harm', 'used to hurt myself', 'used to cut',
  'history of self harm', 'i self harm sometimes', 'i sometimes hurt',
  'scars', 'urge to hurt', 'urge to cut',
]

const stageLocked = {
  // tools
  'launch:abc':                    2,
  'launch:strengths':              2,
  'launch:cognitiveRestructuring': 3,
  'launch:worryPractical':         3,
  'launch:worryHypothetical':      3,
  'launch:problemSolving':         3,
  'launch:behaviouralActivation':  4,
  'launch:exposure':               4,
  'launch:smartGoals':             5,

  // nav — locks tree navigation the same way as tool launches
  'nav:anxious_avoidance':         4,

  // psychoed
  'psychoed:nats':                    2,
  'psychoed:abc_model':               2,
  'psychoed:worry':                   3,
  'psychoed:cognitive_restructuring': 3,
  'psychoed:behavioural_activation':  4,
  'psychoed:avoidance':               4,
}

module.exports = { chatTree, stageRoots, crisisKeywords, selfHarmSoftKeywords, stageLocked }