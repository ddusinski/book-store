module.exports = (sequelize, Sequelize) => {
    const BasketItem = sequelize.define("basketItem", {
        count: {
            type: Sequelize.INTEGER
        }
    });
    return BasketItem;
}