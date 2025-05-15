const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Generate test SMTP service account
    const testAccount = await nodemailer.createTestAccount();

    // Create reusable transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    const mailOptions = {
        from: `"E-commerce Support" <${testAccount.user}>`,
        to: options.email,
        subject: options.subject,
        text: `${options.message}\n\nRESET TOKEN: ${options.resetToken}\n\nUse this token in the reset password endpoint: /api/users/resetpassword/:resettoken`
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    // Log preview URL in a more visible format
    console.log('\n=================================');
    console.log('EMAIL PREVIEW URL:');
    console.log(nodemailer.getTestMessageUrl(info));
    console.log('=================================\n');
    
    return info;
};

module.exports = sendEmail;