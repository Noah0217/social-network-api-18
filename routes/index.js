const apiRoutes = require('./api');
const router = require('express').Router();

//api routes
router.use('/api', apiRoutes);

//error message
router.use((req, res) => {
    res.status(404).send
}
);

module.exports = router;