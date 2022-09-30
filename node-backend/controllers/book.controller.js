const db = require("../models");
const Book = db.books;

//create new Book
exports.create = (req, res) => {
    const book = {
        author: req.body.author,
        name: req.body.name,
        issn: req.body.issn
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
    // Book.findAll({ where: { id: id } }).then(data=>{console.log("I have found the book" + data.name);});
    console.log("Found following ID: " + id);

    Book.findAll({ where: { issn: id } }).then(data => {
        const selectedBook = data[0];
        // console.log("I have found the book name:" + selectedBook.name);
        // console.log("I have found the book author:" + selectedBook.author);
        Book.destroy({ where: { issn: selectedBook.issn } }).then(num => {
            {
                if (num == 1) {
                    res.send({ message: JSON.stringify(selectedBook, null, 4) + " was deleted successfully!" });
                }
                else {
                    res.send({ message: "Cannot delete Book with id= " + id });
                }
            }

        }).catch(err => {
            res.status(500).send({ message: "Cannot delete Book with id= " + id })
        })



    });
};

// const checkBook = async (id) => {
//     const tempBook = await Book.findAll({ where: { id: id } });
//     console.log("hello book: " + JSON.stringify(tempBook, null, 4));
//     console.log("hello book: " + tempBook[0].author);
//     console.log("is  book instance: " + tempBook[0] instanceof Book);
//     const testingBook = Book.build({ name: "testBook", author: "Test author" });
//     console.log("hello testingBook: " + testingBook.author);
// };

// exports.delete = (req, res) => {
//     checkBook(req.params.id);
// };