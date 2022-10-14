const db = require("../models");
const BasketOwner = db.basketOwners;

//create new basketOwner
exports.create = (req, res) => {
    const basket = {
        ownerName: req.body.ownerName,
        phone: req.body.phone
    };

    BasketOwner.create(basket)
        .then(newBasket => {
            console.log("new basked was created");
            res.send(newBasket);
        })
        .catch(err => {
            res.status(500).send({ message: "Some errors occurred" });
        });
};

// find all baskets
exports.findAll = (req, res) => {
    // BasketOwner.findAll({ include: { all: true } }).then(data => {
    BasketOwner.findAll().then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({ message: "Cannot find basketItem" })
        }
    }).catch(err => {
        res.status(500).send({ message: "Error found: " + err.me })
    });
};