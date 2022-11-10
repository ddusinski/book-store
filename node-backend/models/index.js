const Sequelize = require("sequelize");
// const sequelize = new Sequelize("bookstore", "dd", "dd", {
//     host: "localhost",
//     dialect: "mysql",
//     operatorsAliases: false,
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 1000
//     }
// });
const sequelize = new Sequelize("sqlite::memory:")
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.books = require("./book")(sequelize, Sequelize);
db.basketItems = require("./basketItem")(sequelize, Sequelize);
db.basketOwners = require("./basketOwner")(sequelize, Sequelize);

db.books.hasMany(db.basketItems);
db.basketItems.belongsTo(db.books);

db.basketOwners.hasMany(db.basketItems);
db.basketItems.belongsTo(db.basketOwners);

module.exports = db;