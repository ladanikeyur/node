import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
 // true for 465, false for other ports
    auth: {
        user: "keyurpatel5943@gmail.com", // generated ethereal user
        pass: "qppufortfivkalft", // generated ethereal password
    },
});


export default transporter