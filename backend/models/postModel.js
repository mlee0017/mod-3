const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
   subject: { type: String },
   body: { type: String },
   user: { type: String, required: true },
   comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'comment'
   }]
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

module.exports = Post

