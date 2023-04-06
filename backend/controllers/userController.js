const User = require('../models/userModel')

async function show(req, res) {
    try {
        const existingUser = await User.findById(req.id)
        
        res.json({ 
            username: existingUser.username, 
            email: existingUser.email,
            id: req.id
        })

    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    show
}

