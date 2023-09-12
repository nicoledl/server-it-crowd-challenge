const { Sequelize } = require("sequelize");
const config = require("../config/database")
const db = {}

try {
      db.connection = new Sequelize(config.database, config.username, config.password, config);
    } catch (error) {
      console.error("Error al crear la instancia de Sequelize:", error);
    }

module.exports = db;