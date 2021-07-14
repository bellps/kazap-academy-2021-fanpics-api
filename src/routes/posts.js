const router = require('express').Router()
const { posts } = require('../controllers')

// Mapeia as actions com as urls
router.get('/', posts.list)

module.exports = router