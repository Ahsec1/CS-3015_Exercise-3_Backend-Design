const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("testdb", "root", "admin$", {
    host: "localhost",
    dialect: "mysql",
    dialectModule: require('mysql2')
});


module.exports = sequelize;