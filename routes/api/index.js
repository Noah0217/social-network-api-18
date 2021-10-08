const userRoutes = ('./user-routes');
const router = require('express').Router();
const thoughRoutes = require('./though-routes');

router.use('thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;