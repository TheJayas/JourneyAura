import nodemailer from 'nodemailer';
import asyncHandler from './asyncHandler';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = asyncHandler(async (email, subject, message) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
    };

    await transporter.sendMail(mailOptions);
});

export default sendEmail;

