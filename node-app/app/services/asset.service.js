const db = require("../models");
const Asset = db.assets;
const Op = db.Sequelize.Op;

exports.saveAsset = (asset) => {
    Asset.create(asset)
    .then(data => {
        return data;
    })
    .catch(err => { 
        return err;
    });
};