const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require('../models');

// SIGN UP
exports.Signup = (req, res, next) => {
    models.User.findAll({where: { email: req.body.email }})
    .then((data) => {
        if (data.length >= 1) {
            res.status(409).json({
                message: "Email already exists!",
            });
        } else {
            bcrypt.hash(req.body.password, 8)
            .then((hash)=>{
               let user = req.body;
               user.password = hash;
               console.log(user);
               console.log(req.body);
                models.User.create(user)
                    .then((resp) => {
                        var id = resp.dataValues.id;
                        const token = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
                        res.cookie('jwtss', token, {
                            httpOnly: true,
                            domain: process.env.DOMAIN,
                        });
                        res.cookie('roless', resp.dataValues.role, { domain: process.env.DOMAIN });
                        res.cookie('isLoggedss', true, { domain: process.env.DOMAIN });
                        res.cookie('idss', id.toString(), { domain: process.env.DOMAIN });
                        res.status(200).json({
                            message: "User signed up!",
                            id: resp.dataValues.id,
                            email: resp.dataValues.email,
                            });
                    })
                    .catch((e) => {
                        console.log(e);
                        res.status(500).json({
                            err: e,
                        })
                    });
            })
            .catch((err) => {
                console.log(`error: ${err}`)
                res.status(500).json({
                    error: err,
                })
            });
        } 
    })
    .catch((err) => {
        return res.status(500).json({
            error: err,
        });
    });
}



// LOG IN
exports.Login = (req, res, next) => {
    console.log(req.body);
    models.User.findOne({ where: { email: req.body.email }})
    .then((resp) => {
        if(resp===null) {
            return res.status(500).json({
                error: 'User not found',
            })
        }
        bcrypt.compare(req.body.password, resp.dataValues.password)
        .then((verify) => {
           if(verify){
                var id = resp.dataValues.id;
                const token = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
                res.cookie('jwtss', token, {
                    httpOnly: true,
                    domain: process.env.DOMAIN,
                });
                res.cookie('roless', resp.dataValues.role, { domain: process.env.DOMAIN });
                res.cookie('isLoggedss', true, { domain: process.env.DOMAIN });
                res.cookie('idss', id.toString(), { domain: process.env.DOMAIN });
                res.status(200).json({
                    message: "User logged in!",
                    id: resp.dataValues.id,
                    email: resp.dataValues.email,
                });
           }
        })
        .catch((e) => {
            res.status(200).json({
                message: e,
            })
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
            error: 'Could not log you in',
        })
    })
}



// LOG OUT
exports.Logout = (req, res, next) => {
    res.clearCookie('jwtss', { domain: process.env.DOMAIN });
    res.clearCookie('roless', { domain: process.env.DOMAIN });
    res.clearCookie('isLoggedss', { domain: process.env.DOMAIN });
    res.clearCookie('idss', { domain: process.env.DOMAIN });
    res.status(200).json({
        message:'Logged Out'
    });
}



// CHANGE PASSWORD
exports.ChangePassword = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email }})
    .then((resp) => {
        bcrypt.compare(req.body.oldPassword, resp.dataValues.password)
        .then((verify) => {
            if(!verify){
                return res.status(500).json({
                    error: 'Wrong password'
                })
            }
            bcrypt.hash(req.body.newPassword, 8)
            .then((hash) => {
                models.User.update({ password: hash }, { where: { email: req.body.email }})
                .then(() => {
                    res.status(200).json({
                        message: 'Password Updated'
                    })
                })
                .catch((e) => { res.status(500).json({ error: e }) })
            })
            .catch((e) => { res.status(500).json({ error: e }) })
        })
        .catch((e) => { res.status(500).json({ error: e }) })
    })
    .catch((e) => { res.status(500).json({ error: e }) })
}



//GET CURRENTLY LOGGED IN USER
exports.getLoggedUser = (req, res, next) => {
    console.log(req.userData);
    models.User.findOne({ 
        where: { id: req.userData },
        include: [{ all: true }]
    })
    .then((resp) => {
        res.status(200).json({
            message: resp,
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
            error: e
        })
    })
}



//UPDATE LOGGED IN USER DETAILS
exports.UpdateUser = (req, res, next) => {
    models.User.update(req.body, { where: { id: req.userData }})
    .then((resp) => {
        res.status(200).json({
            message: 'User Updated',
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
            error: e
        })
    })
}



//GET ALL USERS
exports.getUsers = (req, res, next) => {
    models.User.findAll({ include: [{ all: true }] })
    .then((resp) => {
        res.status(200).json({
            message: resp,
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
            error: e
        })
    })
}



//GET ONE USER
exports.getUser = (req, res, next) => {
    models.User.findOne({ 
        where: { email: req.query.email },
        include: [{ all: true }]
    })
    .then((resp) => {
        res.status(200).json({
            message: resp,
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
            error: e
        })
    })
}



// FORGOT PASWORD
exports.ForgotPassword = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email }})
    .then((resp) => {
        // verify using otp
        // if verification done then let them set new password
        // set cookies
        res.status(200).json({
            message: 'Password Updated'
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e
        })
    })
}

// ADD A DOCTOR
exports.AddDoctor = (req, res, next) => {
    const DoctorId = req.body.DoctorId
    models.User.update({ DoctorId }, { where: { id: req.userData }})
    .then((resp) => res.status(200).json({
        message: 'Doctor added',
    }))
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    })
}

// DELETE A DOCTOR
exports.DeleteDoctor = (req, res, next) => {
    models.User.update({ DoctorId: null}, { where: { id: req.userData }})
    .then(() => {
        res.status(200).json({
            message: 'Doctor removed!'
        })
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    })
}

// NOTIFY DOCTOR
exports.Notify = (req , res, next) => {
    models.User.findOne({ where: { id: req.userData }})
    .then((resp) => {
        models.Notify.create({
            PatientId: req.userData,
            DocId: resp.dataValues.DoctorId,
            notification: 'Patient in distress! Send help',
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
        })

    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        })
    })
}