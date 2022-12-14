const nodemailer = require('nodemailer');
const pug = require('pug')
const { htmlToText } = require('html-to-text');
const catchAsync = require('./../utils/catchAsync')

//new Email(user, url).sendWelcome();

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // Sendgrid
            return 1
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }

    // Send the actual email
    async send(template, subject) {
        // Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        })
        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html),
        }

        // Create a transport and send email
        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome() {
        await this.send('Welcome', 'Welcome to the Natours family!')
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 10min)')
    }
}
