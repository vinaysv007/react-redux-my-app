import express from 'express';
import commonValidate from '../../src/validator/SignUp';
import isEmpty from 'lodash/isEmpty';

import User from '../model/user';
import { toAuth } from '../model/userauth';
import { sendConfirmationEmail } from '../mailer';
import { getHashedPassword } from "../model/passwordHash";
import jwt from 'jsonwebtoken';

let router = express.Router();

function validateInputs(data, otherValidation) {
    let { errors } = otherValidation(data);

    return User.query({
        where: { username: data.username },
        orWhere: { email: data.email }
    }).fetch().then(result => {
        if (result) {
            if (result.get('username') === data.username) {
                errors.username = 'User is already exists'
            }
            if (result.get('email') === data.email) {
                errors.email = 'Email is already exists'
            }
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    });
}

router.get('/:identifier', (req, res) => {
    let errors = {};
    User.query({
        select: ['username', 'email'],
        where: { username: req.params.identifier },
        orWhere: { email: req.params.identifier }
    }).fetch()
        .then(result => {
            if (result) {
                if (result.get('username') === req.params.identifier) {
                    errors.username = 'User is already exists'
                }
                if (result.get('email') === req.params.identifier) {
                    errors.email = 'Email is already exists'
                }
                res.json({ errors });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
})

router.post('/', (req, res) => {
    validateInputs(req.body, commonValidate).then(({ errors, isValid }) => {
        if (isValid) {
            const { username, password, email, timezone } = req.body;
            const is_confirmed = "false";
            const passwordhash = getHashedPassword(password);
            User.forge({
                username, passwordhash, email, timezone, is_confirmed
            }, { hasTimestamps: true }).save()
                .then(result => {
                    //sendConfirmationEmail(result);
                    res.json(toAuth(result))
                })
                .catch(err => res.status(500).json({ error: err }))
        } else {
            res.status(400).json(errors);
        }
    });
});

router.post('/confirmuser', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid Token' });
        } else {
            User.forge({ id: decoded._id, email: decoded._email }, { hasTimestamps: true }).save({ is_confirmed: "true" })
                .then(result => {
                    res.json({ 'valid': 'true' });
                })
                .catch(err => res.json(500).json({ errors: 'Some problem to update..' }))
        }
    });
});

export default router;
