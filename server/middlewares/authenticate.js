import jwt from 'jsonwebtoken';
import User from '../model/user';

//next: call back function
export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let token;

    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Authentication failed, Token is invalid' })
            } else {
                User.query({
                    select: ['username', 'email'],
                    where: { id: decoded.id }
                }).fetch()
                    .then(user => {
                        if (user) {
                            req.currentUser = user;
                            next();
                        } else {
                            res.status(404).json({ error: 'No such user exists' });
                        }
                    })
                    .catch(() => {
                        res.status(500).json({ error: 'There was a problem in finding the user' })
                    });
            }
        })
    } else {
        res.status(403).json({ error: 'No token provided' });
    }
}