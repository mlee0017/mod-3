const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memoSchema = new Schema({
   mood: {
      type: String,
      required: true,
      enum: [ "(ಥ﹏ಥ)", "(╯°□°）╯︵ ┻━┻", "┬──┬ /( ゜-゜/)", "(｡¬‿¬｡)", "(づ￣ ³￣)づ", "(◕‿◕✿)", "(ಠ╭╮ಠ)", "(♥‿♥ ✿)", "(;´༎ຶД༎ຶ`)", "┴┬┴┤(･_├┬┴┬", "ᕦ(ò_óˇ )ᕤ", "( ⚆ _ ⚆ )", "(~˘▾˘)~"  ]
   },
   user: { type: String, required: true },
   date: { type: Date, default: () => new Date(+new Date() + 365 * 24 * 60 * 60 * 1000), required: true },
   comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'comment'
   }]
}, { timestamps: true })

const Memo = mongoose.model('memo', memoSchema)

module.exports = Memo

