const models = require('../models');

exports.Create = (req, res, next) => {
    let body = req.body;
    body.CreatorId = req.userData;
    models.Post.create(body)
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
    let id = req.body.id;
    models.Post.destroy({ where: {id} })
    .then(() => {
        res.status(200).json({
            message: 'Post deleted',
            id
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    })
}

exports.Get = (req, res, next) => {
    models.Post.findAll({ include:[{all: true}]})
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

exports.GetMeditation = (req, res, next) => {
    models.Post.findOne({
        where: { type: 'meditation'},
        order:  Sequelize.literal('rand()'),
    })
    .then((resp) => {
        res.status(200).json({
            message: resp,
        })
    })
    .catch((e) => {
        res.status(500).json({
            
        })
    })

}

exports.Like = (req, res, next) => {
    let body = req.body;
    body.UserId = req.userData;
    models.Like.create(body)
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

exports.Unlike = (req, res, next) => {
    let id = req.body.id;
    models.Like.destroy({ where: { id }})
    .then(() => {
        res.status(200).json({
            message: 'like deleted'
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    });
}