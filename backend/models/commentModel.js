const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
   body: { type: String },
   user: { type: String, required: true },
// Optional second reference:
   post: { type: mongoose.Types.ObjectId, ref: 'post' }
}, { timestamps: true })

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment

