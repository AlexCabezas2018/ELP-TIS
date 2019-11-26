"use strict";

const nodemailer = require('nodemailer');

// email sender function
function sendEmail(req, res) {
    // Definimos el transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    // Definimos el email
    let mailOptions = {
        from: transporter.user,
        to: transporter.user,
        subject: 'Nuevo envio formulario de contacto',
        text: req.body.message
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, 'Fallo al enviar email');
        } 
        console.log("Email sent");
        res.status(200, "Email enviado");
    });
};

module.exports = {
    sendEmail
}