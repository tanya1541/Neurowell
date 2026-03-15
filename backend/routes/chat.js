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

router.get ('/',                verifyToken, getSession)
router.post('/message',         verifyToken, sendMessage)
router.post('/start-tool',      verifyToken, startTool)
router.post('/start-assessment',verifyToken, startAssessment)
router.post('/reset-tool',      verifyToken, resetTool)

module.exports = router
