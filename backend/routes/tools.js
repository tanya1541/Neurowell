const express    = require('express')
const router     = express.Router()
const { verifyToken } = require('./auth')
const ToolEntry  = require('../models/ToolEntry')
const toolsConfig = require('../data/toolsConfig')

// GET /api/tools
// List all tools, with unlock status for the current user
router.get('/', verifyToken, async (req, res) => {
  try {
    const user  = await require('../models/User').findById(req.user.userId)
    const tools = toolsConfig.map(t => ({
      ...t,
      unlocked: user.storiStage >= t.minStage,
    }))
    res.json({ tools })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET /api/tools/:toolId/entries
// Past entries for one tool — for the library history view
router.get('/:toolId/entries', verifyToken, async (req, res) => {
  try {
    const entries = await ToolEntry
      .find({ userId: req.user.userId, toolId: req.params.toolId })
      .sort({ createdAt: -1 })
      .limit(20)
    res.json({ entries })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// PATCH /api/tools/:toolId/entries/:entryId/review
// User adds a follow-up review note to a past entry (BA, exposure diary, etc.)
router.patch('/:toolId/entries/:entryId/review', verifyToken, async (req, res) => {
  try {
    const entry = await ToolEntry.findOneAndUpdate(
      { _id: req.params.entryId, userId: req.user.userId },
      { $push: { 'data.diary': req.body } },
      { new: true }
    )
    if (!entry) return res.status(404).json({ message: 'Entry not found' })
    res.json({ entry })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router