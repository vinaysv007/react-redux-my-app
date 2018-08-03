import nodemailer from 'nodemailer';
import { generateResetPasswordLink, generateConfirmationLink } from './model/userauth';

const from = '"OPS App" <vinaysv007@gmail.com>';

function setup() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

export function sendConfirmationEmail(user) {
    let trasp = setup();
    let email = {
        from,
        to: user.get('email'),
        subject: 'Welcome to OPS App',
        text: `Open the link to activate your email ${generateConfirmationLink(user)}`
    };
    trasp.sendMail(email);
}

export function sendResetPasswordEmail(user) {
    let trasp = setup();
    let email = {
        from,
        to: user.get('email'),
        subject: 'Reset Password',
        text: `click the link 
                ${generateResetPasswordLink(user)} 
                `
    };
    trasp.sendMail(email);
}