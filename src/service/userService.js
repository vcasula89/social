import userRepo from '../repository/userRepository.js'
import cryptoUtils from '../utils/cryptoUtils.js'
import mailer from 'nodemailer';
import {mailConfig} from '../const/const.js';
import UnauthorizedException from "../exception/UnathorizedException.js";

const register = async (content) => {
  const  {password, salt} = cryptoUtils.hashPassword(content.password)
  content.password = password;
  content.salt = salt;
  content.registrationToken = cryptoUtils.generateUniqueCode(10)
  const result =  await userRepo.add(content);
  await sendRegistrationMail(content.email,
    buildRegistrationLink(result._id, content.registrationToken))
  return result;
}

const buildRegistrationLink = (id, token) => {
  return `http://localhost:8000/user/${id}/confirm/${encodeURIComponent(token)}`
}
const sendRegistrationMail = async (email, link) => {
	const senderAddress = mailConfig.senderAddress;
	const subject = mailConfig.subject;
	const body = `Open this link to complete registration ${link}`;
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
	  from: `"todolist service" <${senderAddress}>`,
	  subject: subject,
	  text: body,
	  to: email,
	  html: mailConfig.html,
	};
	return await mailer.createTransport(transport).sendMail(mailData);
  }
  
  const confirmRegistration = async (id, token) => {
	return await userRepo.confirmRegistration(id, token);
  }

  const login = async (email, password) => {
	const user =  await userRepo.getByEmail(email);
  
	if (!cryptoUtils.compare(password, user.salt, user.password)) {
	  throw new UnauthorizedException('Unauthorized', 401)
	}
	const {accessToken, refreshToken} = cryptoUtils.generateTokens(user)
	user.accessToken = accessToken
	user.refreshToken = refreshToken
	return user;
  }
  
  export {
	register,
	confirmRegistration,
	login,
  }