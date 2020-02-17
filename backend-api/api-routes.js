// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
   res.json({
       status: 'Todo API is working',
       message: 'Welcome to todo API routes'
   }); 
});

// Export API routes
module.exports = router;