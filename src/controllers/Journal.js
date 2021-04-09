const models = require('../models');
const bcrypt = require("bcrypt");

exports.Create = (req, res, next) => {
    let body = req.body;
    body.UserId = req.userData;
    console.log(body);
    models.Journal.create(body)
    .then((resp) => {
        res.status(200).json({
            message: resp,
        })
    } )
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    });
}

exports.Edit = (req, res, next) => {
    const id = req.body.id;
    models.Journal.update(req.body, {
        where: {
            id: id,
        }
    })
    .then((resp) => {
        res.status(200).json({
            message: 'Journal Updated!'
        })
    })
    .catch((e) => {
        res.ststus(500).json({
            error: e,
        })
    })
} 

exports.Delete = (req, res, next) => {
    const id = req.body.id;
    models.Journal.destroy({ where: { id }})
    .then(() => {
        res.status(200).json({
            message: `Journal deleted`,
            id,
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    })

} 

exports.Get = (req, res, next) => {
    models.Journal.findAll({ where: { UserId: req.userData }})
    .then((resp) => {
        res.status(200).json({
            message: resp,
        })
    })
    .catch((e) => {
        res.status(500).json({
            errror: e,
        })
    })
} 