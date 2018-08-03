import express from 'express';
import User from '../model/user';
import { toAuth } from '../model/userauth';
import { sendResetPasswordEmail } from '../mailer';
import jwt from 'jsonwebtoken';
import { isValidPassword, getHashedPassword } from "../model/passwordHash";

let router = express.Router();


router.post('/', (req, res) => {
    const { username, password } = req.body;

    User.query({
        where: { username: username },
        orWhere: { email: username }
    }).fetch()
        .then(result => {
            if (result) {
                if (isValidPassword(password, result.get('passwordhash'))) {
                    res.json(toAuth(result));
                } else {
                    res.status(401).json({ form: 'Invalid Credentials' });
                }
            } else {
                res.status(401).json({ form: 'Invalid Credentials' });
            }
        })
});

router.post('/forgotpassword', (req, res) => {
    User.query({ where: { email: req.body.email } }).fetch()
        .then(result => {
            if (result) {
                sendResetPasswordEmail(result);
                res.json({});
            } else {
                res.status(400).json({ errors: { global: 'No user with such email' } })
            }
        })
});

router.post('/validatetoken', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({});
        } else {
            res.json({});
        }
    });
});

router.post('/resetpassword', (req, res) => {
    const { token, password } = req.body;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ errors: { global: 'Invalid Token' } });
        } else {
            User.query({
                where: { id: decoded._id },
                orWhere: { email: decoded._email }
            }).fetch()
                .then(retrivedUser => {
                    if (!retrivedUser) return res.status(401).json({ errors: { global: 'Invalid User' } })
                    if (retrivedUser.get('email') === decoded._email) {
                        const passwordhash = getHashedPassword(password);
                        User.forge({ id: decoded._id, email: decoded._email }, { hasTimestamps: true }).save({ passwordhash: passwordhash })
                            .then(result => {
                                res.json({
                                    success: true,
                                    message: 'Password updated successfully.'
                                });
                            })
                            .catch(err => res.json(500).json({ errors: { global: 'Some problem to update..' } }))
                    } else {
                        res.status(401).json({ errors: { global: 'Invalid User' } });
                    }
                })
                .catch(err => {
                    res.status(500).json({ errors: { global: 'Error in server, wait for some time..' } });
                })
        }
    });
})

export default router;