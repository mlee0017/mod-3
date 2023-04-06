const Memos = require('../models/memoModel')
const Comments = require('../models/commentModel')

module.exports.createComment = async (req, res) => {
    try {
        const comment = await Comments.create(req.body)
        await Memos.findByIdAndUpdate(req.params.pid, {
            $push: {
                comments: comment._id
            }
        })
        res.status(200).json(comment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        await Comments.findByIdAndDelete(req.params.id)
        await Memos.findByIdAndUpdate(req.params.pid, {
            $pull: {
                comments: req.params.id
            }
        })
        res.json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.indexComment = async (req, res) => {
    try {
        const memo = await Memos.findById(req.params.pid).populate('comments')
        res.json(memo.comments)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.showComment = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id)
        res.json(comment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        await Comments.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'updated successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}