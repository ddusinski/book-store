module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        author: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        }
    });
    return Book;
}