const router = require('express').Router();


router.use('/api', require('./users'));
router.use('/api', require('./auth'));
router.use('/api', require('./yoga'));

module.exports = router;

