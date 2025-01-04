/**
 * VALIDATORS
 */

import createUserValidator from '../validator/user/createValidator.js'
import loginValidator from '../validator/user/loginValidator.js'

/**
 * USER CONTROLLERS
*/
import createUserController from './user/createUserController.js'
import checkUserMailController from './user/checkUserMailController.js'
import loginController from './user/loginController.js';
import recoveryPasswordController from "./user/recoveryPasswordController.js";
import validRestoreTokenController from "./passwordReset/validRestoreTokenController.js";

const setup = (app) => {
    app.post('/user', createUserValidator, createUserController);
    app.get('/user/:id/confirm/:registrationToken',checkUserMailController);
    app.post('/user/login', loginValidator, loginController);


    // controllo e spedico l'eventuale link di ripristino password sul FE
    app.get('/user/recovery-password/:email' , recoveryPasswordController);

    //controllo che il token di reset password sia ancora valido e lo dico al FE
    app.get('/password-reset/check-restore-token/:restoreToken', validRestoreTokenController)

    //aggiorno la password per l'utente
    //app.post('/user/reset-password/:id/:restoreToken', resetPasswordValidator, updateUserPasswordController);
    
    //definire app.use dopo la route app.post, app.patch
    app.use((err, req, res, next) => {
        if (err && err.error && err.error.isJoi) {
            res.status(400).json({
                type: err.type,
                message: err.error.toString()
            })

        } else {
            next(err);
        }
    })
}

export default setup;