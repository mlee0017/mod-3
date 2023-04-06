const Memos = require('../models/memoModel')
const Comments = require('../models/commentModel')

module.exports.seed = async (req, res) => {
    // await Memos.deleteMany({})
    // await Memos.create(memo)
    res.redirect('/memo')
}

module.exports.index = async (req, res) => {
    try {
        const memos = await Memos.find().sort({ createdAt: 1 })
        res.status(200).json(memos)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    try {
        const memo = await Memos.findByIdAndDelete(req.params.id)
        await Comments.deleteMany({ _id: { 
            $in: memo.comments 
        }})
        res.status(200).json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedMemo = await Memos.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedMemo)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.create = async (req, res) => {
    try {
        const memo = await Memos.create(req.body)
        res.status(200).json(memo)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.show = async (req, res) => {
    try {
        const memo = await Memos.findById(req.params.id).populate('comments')
        res.status(200).json(memo)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}