module.exports = (sequelize, Sequelize) => {
    const Basket = sequelize.define("basket", {
        owner: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        phone: { type: Sequelize.INTEGER }
    });
    return Basket;
}