const express = require('express')
const router = express.Router()
const memoController = require('../controllers/memoController')
const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')
router.get('/seed', memoController.seed)
router.get('/', memoController.index)
router.delete('/:id', authorize, confirmUserAccess, memoController.delete)
router.put('/:id', authorize, confirmUserAccess, memoController.update)
router.post('/', authorize, memoController.create)
router.get('/:id', memoController.show)
module.exports = router

// authorize index and show 