module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        author: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        issn: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
    return Book;
}