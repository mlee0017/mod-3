const express = require('express')
const router = express.Router()
// const { authorize } = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
router.get('/', userController.show)
// index route attached to router object, call back uses res 
// router.get('/new', userController.new)
// router.delete('/clear', userController.clear)
// router.delete('/:id', userController.delete)
// router.put('/:id', userController.update)
// router.post('/', userController.create)
// router.get('/:id/edit', userController.edit)
// router.get('/:id', userController.show)
module.exports = router; 