const Sequelize = require("sequelize");
const sequelize = new Sequelize("bookstore", "dd", "dd", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.books = require("./book")(sequelize, Sequelize);
module.exports = db;