const Product = require("../database/models/Product");
const Brand = require("../database/models/Brand");
const { Op } = require("sequelize");

// search product
async function searchProducts(req, res) {
  try {
    const { keyword } = req.query;

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${keyword}%`, // Búsqueda insensible a mayúsculas y minúsculas en MySQL
            },
          },
          {
            description: {
              [Op.iLike]: `%${keyword}%`, // Búsqueda insensible a mayúsculas y minúsculas en MySQL
            },
          },
          {
            "$brand.name$": {
              // Busca coincidencias en la propiedad 'name' de la tabla 'Brand'
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      },
      include: {
        model: Brand,
        attributes: ["name", "image_url"],
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ error: "Error al buscar productos" });
  }
}

// get all products per page
async function searchProductsPerPage(req, res) {
  const PRODUCTS_PER_PAGE = 15;
  try {
    const { page = 1, keyword } = req.query;
    const offset = (page - 1) * PRODUCTS_PER_PAGE;

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            "$brand.name$": {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
      include: {
        model: Brand,
        attributes: ["name", "image_url"],
      },
      limit: PRODUCTS_PER_PAGE,
      offset: offset,
    });

    res.json(products);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ error: "Error al buscar productos" });
  }
}

module.exports = {
  searchProducts,
  searchProductsPerPage,
};
