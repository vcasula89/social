import passwordResetRepository from "../repository/passwordResetRepository.js";
import {mailConfig} from "../const/const.js";
import mailer from "nodemailer";
import userRepo from "../repository/userRepository.js";

const createPasswordReset = async (id, expirationDataTime, token) => {
    const content = {
        userId: id,
        expirationDateTime: expirationDataTime,
        restoreToken: token,
    }
    const result =  await passwordResetRepository.add(content)
    return result;
}

const sendResetPasswordMail = async (email, link) => {
    const senderAddress = mailConfig.senderAddress;
    const subject = mailConfig.subjectResetpassword;
    const body = `Open this link to reset your password ${link}`;
    const transport = {
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
        auth: {
            user: senderAddress,
            pass: mailConfig.smtpPassword, //creata ad hoc la password per le APP di Google
        },
    };
    const mailData = {
        from: `"social platform" <${senderAddress}>`,
        subject: subject,
        text: body,
        to: email,
        html: mailConfig.html,
    };
    return await mailer.createTransport(transport).sendMail(mailData);
}

const getPasswordResetByRestoreToken = async (restoreToken) => {
    try {
        const passwordReset =  await passwordResetRepository.getByRestoreToken(restoreToken);
        return passwordReset ;
    }catch(err) {
        throw err;
    }
}

export{
    createPasswordReset,
    sendResetPasswordMail,
    getPasswordResetByRestoreToken
}