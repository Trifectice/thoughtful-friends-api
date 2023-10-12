const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Prefix user routes with '/users' and thought routes with '/thoughts'
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
