const Sequelize = require('sequelize');
const models = require('../models');

exports.Create = (req, res, next) => {
    let body = req.body;
    body.UserId = req.userData;
    models.Sign.create(body)
    .then((resp) => {
        res.status(200).json({
            message: resp,
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    });

}

exports.Delete = (req, res, next) => {
    models.Sign.destroy({ where: { id: req.body.id }})
    .then((resp) => {
        res.status(200).json({
            message: 'Sign Deleted'
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    })
}

exports.Get = (req, res, next) => {
    models.Sign.findAll()
    .then((resp) => {
        res.status(200).json({
            message: resp
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    });
}

exports.GetRandom = (req, res, next) => {
    models.Sign.findOne({
        order: Sequelize.literal('rand()')
    })
    .then((resp) => {
        res.status(200).json({
            message: resp
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    });
}