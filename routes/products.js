const express = require("express");
const productController = require("../controllers/productController");
const app = express();
const verifyToken = require("../middleware/auth");
const router = express.Router();

// get all products
router.get("/", productController.getAllProducts);

// get products per page
router.get("/:page", productController.getProductsPerPage);

// get product by id
router.get("/:id", productController.getProductById);

// rutas prodegidas:
router.use(verifyToken);

// create new product
router.post("/", verifyToken, productController.createProduct);

// modify product
router.put("/:id", verifyToken, productController.updateProduct);

// delete product
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;
