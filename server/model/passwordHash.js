import bcrypt from 'bcryptjs';

export const getHashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const isValidPassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}