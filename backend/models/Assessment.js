const mongoose = require('mongoose')

const AssessmentSchema = new mongoose.Schema({
  userId:        { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },

  answers:       [{ questionId: Number, answer: Number }],

  assignedStage: { 
    type: Number 
  },

  scores:        { 
    type: mongoose.Schema.Types.Mixed 
  },

  completedAt:   { 
    type: Date, default: Date.now 
  }
})

module.exports = mongoose.model('Assessment', AssessmentSchema)
