const db = require("../models");
const BasketOwner = db.basketOwners;
const Book = db.books;
const BasketItem = db.basketItems;

//create new basketItem
exports.create = (req, res) => {
    const basketItem = {
        count: req.body.count
    };

    BasketOwner.findAll({ where: { ownerName: req.body.ownerName } }).then(ownerData => {
        const selectedOwner = ownerData[0];
        Book.findAll({ where: { issn: req.body.issn } }).then(data => {
            const selectedBook = data[0];
            BasketItem.create(basketItem)
                .then(newBasketItem => {
                    console.log("basket item is creating");
                    selectedBook.addBasketItem(newBasketItem);
                    selectedOwner.addBasketItem(newBasketItem);
                    res.send(newBasketItem);
                })
        })
    })
        .catch(err => {
            res.status(500).send({ message: "Some errors occurred" });
        });
};

// find all basketItems
exports.findAll = (req, res) => {
    BasketItem.findAll({ include: { all: true } }).then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({ message: "Cannot find basketItem" })
        }
    }).catch(err => {
        res.status(500).send({ message: "Error found: " + err.me })
    });
};

//delete basketItem
exports.delete = (req, res) => {
    bookItemId = req.params.id
    BasketItem.destroy({ where: { id: bookItemId } }).then(num => {
        {
            res.send({ message: "Book Item with ID: " + bookItemmId + " was deleted successfully!" });
        }

    }).catch(err => {
        res.status(500).send({ message: "Cannot delete Book with id= " + bookItemId })
    })
};

