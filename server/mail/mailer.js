const path = require('path');
const nodemailer = require("nodemailer");
const EmailTemplate = require('email-templates');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const mailServer = 'gym.schedule.app@gmail.com';
const homePage = 'https://gym-schedule.herokuapp.com';

const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

const absoluteEmailPath = path.join(__dirname, 'templates', 'verifyEmail');

const VerifyEmailTemplate = new EmailTemplate();

const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: mailServer,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

const sendMail = (mail, content) => {
    const mailOptions = {
        from: mailServer,
        to: mail,
        subject: 'Please verify your email address.',
        generateTextFromHTML: true,
        html: content
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
}

const verifyEmail = (mail, name, token) => {
    const link = `${homePage}/email/confirm_verification/${token}`;

    VerifyEmailTemplate
    .render(absoluteEmailPath, {
        homePage: homePage,
        link: link,
        mail: mail,
        name: name
    })
    .then((result) => {
        sendMail(mail, result);
    })
    .catch((err) => {
        console.log('err', err);
    });
}

module.exports = { verifyEmail };
