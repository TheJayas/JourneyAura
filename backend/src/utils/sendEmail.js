import {resend} from 'resend';

const sendEmail = async (email, subject, text) => {
    try {
        await resend({
            from: 'onboarding@resend.dev',
            to: email,
            subject: subject,
            text: text
        });

    } catch (error) {
        console.log(error);
    }
};

export { sendEmail };



