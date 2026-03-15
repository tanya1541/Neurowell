const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:                  { 
    type: String, 
    required: true 
  },
  email:                 { 
    type: String, 
    unique: true, 
    required: true 
  },
  password:              { 
    type: String, 
    required: true },
  storiStage:            { 
    type: Number, 
    default: null },
  assessmentCompletedAt: { 
    type: Date, 
    default: null 
  },
  lastCrisisAt:          { 
    type: Date, 
    default: null },
  createdAt:             { 
    type: Date, 
    default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)
