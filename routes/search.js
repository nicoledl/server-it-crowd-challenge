const express = require("express");
const searchController = require("../controllers/searchController");
const router = express.Router();

// get all by search
router.get("/", searchController.searchProducts);

// get all by search per page
router.get("/page", searchController.searchProductsPerPage);

module.exports = router;
