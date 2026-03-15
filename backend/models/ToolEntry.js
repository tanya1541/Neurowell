const mongoose = require('mongoose')

const ToolEntrySchema = new mongoose.Schema({
  userId:    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },

  toolId:    {
    type: String, 
    required: true 
  },

  data:      { 
    type: mongoose.Schema.Types.Mixed 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
})

module.exports = mongoose.model('ToolEntry', ToolEntrySchema)
