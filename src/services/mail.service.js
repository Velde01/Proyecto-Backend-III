const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const sendRecoveryMail = async (email, token) => {
    const link = `http://localhost:8080/api/sessions/reset-password?token=${token}`;
    return await transport.sendMail({
        from: 'Ecommerce Coderhouse <' + process.env.MAIL_USER + '>',
        to: email,
        subject: 'Recuperación de Contraseña',
        html: `
            <div>
                <h2>Restablecer tu contraseña</h2>
                <p>Haz clic en el siguiente enlace para cambiar tu contraseña. Este enlace expira en 1 hora.</p>
                <a href="${link}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none;">Restablecer Contraseña</a>
            </div>
        `
    });
};

module.exports = { sendRecoveryMail };