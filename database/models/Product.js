const { Model, DataTypes } = require("sequelize");
const { connection } = require("../dbConnection");

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      collate: "utf8_general_ci",
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      collate: "utf8_general_ci",
      allowNull: false,
      validate: {
        max: {
          args: [200],
          msg: "The description cannot be more than 200 characters.",
        },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "product",
    timestamps: false,
  }
);

module.exports = Product;
