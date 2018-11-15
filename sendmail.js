'use strict';
const nodemailer = require('nodemailer');
const {credentials} = require('config.js');
nodemailer.createTestAccount((err, account) => {

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: credentials.name,
            pass: credentials.password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'thien061097@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
});