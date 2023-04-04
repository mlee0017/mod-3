const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController)
const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')
router.get('/seed', postController.seed)
router.get('/', postController.index)
router.delete('/:id', authorize, confirmUserAccess, postController.delete)
router.put('/:id', authorize, confirmUserAccess, postController.update)
router.post('/', authorize, postController.create)
router.get('/:id', postController.show)
module.exports = router