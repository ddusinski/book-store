module.exports = (sequelize, Sequelize) => {
    const BasketOwner = sequelize.define("basketOwner", {
        ownerName: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        phone: { type: Sequelize.INTEGER }
    });
    return BasketOwner;
}