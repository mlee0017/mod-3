const User = require('../models/userModel')
// data and logic is handled by controller
async function show(req, res) {
    try {
        const foundUser = await User.findById(req.id)
        
        res.json({ 
            username: foundUser.username, 
            email: foundUser.email,
            id: req.id
        })

    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    show
}

// creates function as property of userController
// callback functions originally are from app.get('/', () => {})
// views are handled by react, use jsx view engine to create view engine for view components
// res.render to render view components 
// folder must be named views, files must be jsx to match view engine
// res.render('subfolder/Component', data passed to view, an object and add properties you need { prop: model[req.params.index]})
// sending prop data from server to the component
// can't display an object in react, must display color
// using react in views to view a static page
// dumbed down of version of react to allow you to write jsx
// jsx consumes and displays data 
// change state and hooks client side 
// controller is sending back data for client side to render 