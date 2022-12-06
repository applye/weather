const nodemail = require('nodemailer');
const { user, pass } = require('./config');
const sendEmail = async (data) => {
    const transporter = nodemail.createTransport({
        host: 'smtp.126.com',
        port: '465',
        secure:true,
        auth: {
            user,
            pass
        }
    });
    data.from = `"${data.from}" ${user}`;
    await transporter.sendMail(data);
}
module.exports = sendEmail;