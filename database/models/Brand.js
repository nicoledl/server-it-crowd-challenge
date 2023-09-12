const { Model, DataTypes } = require("sequelize");
const {connection} = require("../dbConnection");


class Brand extends Model {}
Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize:connection,
    modelName: "brand",
    timestamps: false
  }
);

module.exports = Brand;
