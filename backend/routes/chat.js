// routes/chat.js
// ─────────────────────────────────────────────────────────────────────────────
const express = require('express')
const router  = express.Router()
const { verifyToken } = require('./auth')
const {
  sendMessage,
  getSession,
  resetTool,
  startTool,
  startAssessment,
} = require('../controllers/chatController')
const User = require('../models/User')

router.get ('/',                verifyToken, getSession)
router.post('/message',         verifyToken, sendMessage)
router.post('/start-tool',      verifyToken, startTool)
router.post('/start-assessment',verifyToken, startAssessment)
router.post('/reset-tool',      verifyToken, resetTool)
router.get('/articles', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    const psychoedContent = require('../data/psychoedContent')
    const psychoedConfig  = require('../data/psychoedConfig')
    // Merge content + config, filter by user's stage
    const articles = psychoedConfig
      .filter(c => !user.storiStage || c.minStage <= user.storiStage)
      .map(c => {
        const content = psychoedContent.find(a => a.id === c.id)
        return {
          id:           c.id,
          title:        content?.title    || c.id,
          readTime:     content?.readTime || '',
          minStage:     c.minStage,
          safeMessaging: content?.safeMessaging || false,
          hasReflection: c.hasReflection,
          sections:     content?.sections || [],
        }
      })
    res.json({ articles })
  } catch (err) {
  console.error('articles route error:', err.message)
  res.status(500).json({ message: 'Something went wrong' })
}
})

module.exports = router
