const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memoSchema = new Schema({
   subject: { type: String },
   body: { type: String },
   user: { type: String, required: true },
   comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'comment'
   }]
}, { timestamps: true })

const Memo = mongoose.model('memo', memoSchema)

module.exports = Memo

