const userRoutes = ('./user-routes');
const router = require('express').Router();
const thoughRoutes = require('./thought-routes');

router.use('thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;