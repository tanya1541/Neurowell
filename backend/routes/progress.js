// routes/progress.js
// ─────────────────────────────────────────────────────────────────────────────
const express    = require('express')
const router     = express.Router()
const { verifyToken } = require('./auth')
const User       = require('../models/User')
const Assessment = require('../models/Assessment')
const ToolEntry  = require('../models/ToolEntry')
const toolsConfig = require('../data/toolsConfig')

// GET /api/progress/summary
// Everything the Progress screen needs in one call
router.get('/summary', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const user   = await User.findById(userId)

    // All assessments — for stage history chart
    const assessments = await Assessment
      .find({ userId })
      .sort({ completedAt: 1 })
      .select('assignedStage completedAt')

    // Tool usage counts — for activity summary
    const toolCounts = await ToolEntry.aggregate([
      { $match: { userId: user._id } },
      { $group: { _id: '$toolId', count: { $sum: 1 }, lastUsed: { $max: '$createdAt' } } },
    ])

    // Total sessions (tool completions as a proxy for MVP)
    const totalToolUses = toolCounts.reduce((sum, t) => sum + t.count, 0)

    res.json({
      currentStage:      user.storiStage,
      assessmentHistory: assessments,
      toolUsage:         toolCounts,
      totalToolUses,
      memberSince:       user.createdAt,
    })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router



































