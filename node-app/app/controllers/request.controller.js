const db = require("../models");
const Asset = db.assets;
const Op = db.Sequelize.Op;

// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
    const search = req.query.q;
    let condition = {status: {[Op.gte]: 2}}; //default condition status 2 for review

    if (search != undefined) {
        condition['note'] = { [Op.like]: `%${search}%` };
    }

    Asset.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Requests."
        });
    });
};

// Find a single Requests with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Asset.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Request with id=" + id
        });
    });
};

// Update a Asset by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Asset.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Request was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Request with id=" + id
        });
    });
};

// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Asset.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Request was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Request with id=" + id
        });
    });
};

// Delete all Requests from the database.
exports.deleteAll = (req, res) => {
    Asset.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Request were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Requests."
        });
    });
};