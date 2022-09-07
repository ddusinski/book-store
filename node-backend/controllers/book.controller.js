const db = require("../models");
const Book = db.books;


const findBook = async function (id) {
    await Book.findAll({ where: { id: id } })
};


//create new Book
exports.create = (req, res) => {
    const book = {
        author: req.body.author,
        name: req.body.name
    };
    Book.create(book).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some errors occurred" });
        });
};

// find all books
exports.findAll = (req, res) => {
    Book.findAll().then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({ message: "Cannot find Book" })
        }
    }).catch(err => {
        res.status(500).send({ message: "Error found: " + err.me })
    });
};

//delete book
exports.delete = (req, res) => {
    const id = req.params.id;

    // const book = await Book.findAll({ where: { id: id } });
    const book = findBook(id);


    console.log("I have found the book" + book);

    Book.destroy({ where: { id: id } }).then(num => {
        {
            if (num == 1) {
                res.send({ message: book + " was deleted successfully!" });
            }
            else {
                res.send({ message: "Cannot delete Book with id= " + id });
            }
        }
    }).catch(err => {
        res.status(500).send({ message: "Cannot delete Book with id= " + id })
    })
};

