const Product = require("../database/models/Product");
const Brand = require("../database/models/Brand");

// get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll({
      include: {
        model: Brand,
        attributes: ["name", "image_url"],
      },
    });
    res.json(products);
  } catch (error) {
    console.error("Error getting products per page:", error);
    res.status(500).json({ error: "Error getting products" });
  }
}

// get all products per page
async function getProductsPerPage(req, res) {
  const PRODUCTS_PER_PAGE = 15;
  try {
    const page = parseInt(req.params.page, 10);
    const offset = (page - 1) * PRODUCTS_PER_PAGE;

    const products = await Product.findAll({
      limit: PRODUCTS_PER_PAGE,
      offset: offset,
      include: {
        model: Brand,
        attributes: ["name", "image_url"],
      },
      order: [['id', 'ASC']]
    });
    
    res.json(products);
  } catch (error) {
    console.error("Error getting products per page:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// create new product
async function createProduct(req, res) {
  try {
    const { name, description, image_url, price, brandId } = req.body;
    const product = await Product.create({
      name,
      description,
      image_url,
      price,
      brandId,
    });
    console.log("Product created:", product.toJSON());
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
}

// get product by id
async function getProductById(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (error) {
    console.error("Error searching product:", error);
    res.status(500).json({ error: "Error searching product" });
  }
}

// modify product
async function updateProduct(req, res) {
  try {
    const { name, description, image_url, price, brandId } = req.body;
    await Product.update(
      {
        name,
        description,
        image_url,
        price,
        brandId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
}

// delete product
async function deleteProduct(req, res) {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Product succefull deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
}

module.exports = {
  getAllProducts,
  getProductsPerPage,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
