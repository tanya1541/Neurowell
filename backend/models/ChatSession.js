// models/ChatSession.js
const mongoose = require('mongoose')

const ChatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  mode: {
    type: String,
    enum: ['triage', 'tool', 'assessment', 'reflection', 'psychoed'],
    default: 'triage',
  },

  status: {
    type: String,
    enum: ['active', 'abandoned'],
    default: 'active',
  },

  // ── Triage ────────────────────────────────────────────────────
  currentNodeId: { type: String, default: null },

  // ── Tool ──────────────────────────────────────────────────────
  activeToolId:      { type: String, default: null },
  reviewOfEntryId:   { type: mongoose.Schema.Types.ObjectId, default: null }, // set when tool is a diary entry on an existing ToolEntry
  toolStep:      { type: Number,  default: 0    },
  toolData:      { type: mongoose.Schema.Types.Mixed, default: {} },

  // ── Psychoed ──────────────────────────────────────────────────
  psychoedId:    { type: String, default: null }, // current article id
  pendingToolId: { type: String, default: null }, // tool to offer after article

  // ── Assessment ────────────────────────────────────────────────
  // 6 groups × 5 questions. assessmentGroupIndex tracks which group (0–5).
  // assessmentAnswers is a temporary buffer — cleared immediately after
  // Assessment document is created on group 6 completion. Not duplicated.
  assessmentGroupIndex: { type: Number, default: 0 },
  assessmentAnswers:    [{ questionId: Number, answer: Number }],

  // ── Reassessment tracking ─────────────────────────────────────
  // distinctToolsUsed: deduped list of toolIds completed this session
  // psychoed articles with hasReflection count as 'psychoed_<id>'
  distinctToolsUsed:      [String],
  selfHarmArticleOffered: { type: Boolean, default: false },

  progressSignals: {
    positiveRootChoices: { type: Number, default: 0 },
    toolCompletions:     { type: Number, default: 0 },
    reflectionPositive:  { type: Number, default: 0 },
  },

  // ── Message log ───────────────────────────────────────────────
  messages: [{
    role:      { type: String, enum: ['user', 'bot'] },
    text:      String,
    mode:      String,
    timestamp: { type: Date, default: Date.now },
  }],

  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('ChatSession', ChatSessionSchema)