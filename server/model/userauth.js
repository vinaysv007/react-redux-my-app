import jwt from 'jsonwebtoken';

export const toAuth = (user) => {
    return {
        token: generateAuthToken(user)
    }
}

function generateAuthToken(user) {
    return jwt.sign({
        id: user.get('id'),
        username: user.get('username'),
        email: user.get('email'),
        isConfirmed: user.get('is_confirmed')
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 }
    )
}

export const generateResetPasswordLink = (user) => {
    return `${process.env.ROOT_HOST}/reset_password/${generateResetPasswordToken(user)}`;
}

function generateResetPasswordToken(user) {
    return jwt.sign({
        _id: user.get('id'),
        _email: user.get('email')
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 }
    );
}

export const generateConfirmationLink = (user) => {
    return `${process.env.ROOT_HOST}/confirm_user/${generateConfirmToken(user)}`
}

function generateConfirmToken(user) {
    return jwt.sign({
        _id: user.get('id'),
        _username: user.get('username'),
        _email: user.get('email'),
        _isConfirmed: user.get('is_confirmed')
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 });
}