const  nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: "bilal.altaf@visnext.net",
        pass: "hxkyjdopnkgxazqh"
    }
})


const sendEmail = async(to, subject, body)=>{
    console.log("inside send email", to, subject, body );
    
    try {
        await transporter.sendMail({
            from: "bilal.altaf@visnext.net",
            to: to,
            subject: subject,
            text:  body
        })

    } catch (error) {
        
    }
}

module.exports = sendEmail;