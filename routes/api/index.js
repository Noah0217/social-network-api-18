const userRoutes = require('./user-routes');
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;