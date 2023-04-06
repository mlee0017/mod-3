const jwt = require('jsonwebtoken')
const Memo = require('../models/memoModel')
const Comment = require('../models/commentModel')

async function authorize(req, res, next) {
    try {
        let token = req.header("Authorization")
        if (!token) { 
            throw new Error('No token provided')
        }
        token = token.replace("Bearer ", "")
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (payload.error) {
            throw new Error(payload.error)
        }
        req.id = payload.id
        req.user = payload.user
        next()
    } catch(err) {
        console.log(err)
        res.status(403).json({ error: err.message })
    }
}

async function confirmUserAccess(req, res, next) {
    try {
        let document;
        if (req.baseUrl.includes('memo')) { 
            document = await Memo.findOne({ _id: req.params.id, user: req.user })
        } else {
            document = await Comment.findOne({ _id: req.params.id, user: req.user })
        }
        if (!document) {
            throw new Error('User did not create this document')
        }
        next()
    } catch(err) {
        res.status(403).json({ error: err.message })
    }
}

module.exports = {
    authorize,
    confirmUserAccess
}