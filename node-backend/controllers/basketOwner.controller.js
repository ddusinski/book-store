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

//delete basket owner
exports.delete = (req, res) => {
    const basketOwnerPhone = req.params.id
    BasketOwner.destroy({ where: { phone: basketOwnerPhone } }).then(num => {
        {
            res.send({ message: "basket owner Item with ID: " + basketOwnerPhone + " was deleted successfully!" });
        }
    }).catch(err => {
        res.status(500).send({ message: "Cannot delete BasketItem with id= " + basketOwnerPhone })
    })
};
