module.exports = (sequelize, Sequelize) => {
    const BasketOwner = sequelize.define("basketOwner", {
        ownerName: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
    return BasketOwner;
}