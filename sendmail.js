// 'use strict';
const nodemailer = require('nodemailer');
const {credentials} = require('./config.js');
const fs = require('fs');
const filePath = './data.txt';
const crawler = require('./index.js');
const moment = require('moment');

const sendmail = () => {nodemailer.createTestAccount((err, account) => {
    const content = fs.readFileSync(filePath, 'utf8');

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: credentials.name,
            pass: credentials.password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Reddit Crawler" <foo@example.com>', // sender address
        to: 'thien061097@gmail.com', // list of receivers
        subject: `Crawl Galaxy S9 at ${moment().format('LT L')} ✔`, // Subject line
        text: 'Hello world?', // plain text body
        html: content // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mail Sent!');

    });
})};

crawler(sendmail);