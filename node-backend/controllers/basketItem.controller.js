const db = require("../models");
const Basket = db.baskets;
const Book = db.books;
const BasketItem = db.basketItems;

//create new basketItem
exports.create = (req, res) => {
    const basketItem = {
        count: req.body.count
    };

    Basket.findAll({ where: { owner: req.body.owner } }).then(ownerData => {
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
    BasketItem.findAll().then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({ message: "Cannot find basketItem" })
        }
    }).catch(err => {
        res.status(500).send({ message: "Error found: " + err.me })
    });
};

