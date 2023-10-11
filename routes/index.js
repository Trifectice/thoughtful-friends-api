const router = require('express').Router();

// Import API routes
const apiRoutes = require('./api');

// Prefix all API routes with '/api'
router.use('/api', apiRoutes);

module.exports = router;
