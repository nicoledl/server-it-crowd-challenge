const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const productRoutes = require('./products');
const brandRoutes = require('./brands');
const searchRoutes = require('./search');

router.use('/auth', authRoutes);
router.use('/api/products', productRoutes);
router.use('/api/brands', brandRoutes);
router.use('/api/search', searchRoutes);

module.exports = router;