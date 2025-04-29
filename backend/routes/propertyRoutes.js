const express = require('express');
const router = express.Router();
const { submitData, getClusteredData } = require('../controllers/propertyController');

router.post('/submit', submitData);
router.get('/clustered', getClusteredData);

module.exports = router;
