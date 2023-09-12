const Product = require("./models/Product")
const Brand = require("./models/Brand")

Brand.hasMany(Product, { foreignKey: 'brandId' }); // Una marca tiene muchos productos
Product.belongsTo(Brand, { foreignKey: 'brandId' });