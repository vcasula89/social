/**
 * VALIDATORS
 */
import multer from 'multer';
import createUserValidator from '../validator/user/createValidator.js'
import loginValidator from '../validator/user/loginValidator.js'
import resetPasswordValidator from '../validator/user/resetPasswordValidator.js'
import createPostValidator from "../validator/post/createPostValidator.js";

/**
 * USER CONTROLLERS
*/
import createUserController from './user/createUserController.js'
import checkUserMailController from './user/checkUserMailController.js'
import loginController from './user/loginController.js';
import recoveryPasswordController from "./user/recoveryPasswordController.js";
import updateUserPasswordController from "./user/updateUserPasswordController.js";

/**
 * POST CONTROLLERS
 */
import createPostController from "./post/createPostController.js";
import getPostController from "./post/getPostController.js"

/**
 * TOKEN CONTROLLERS
 */
import validRestoreTokenController from "./passwordReset/validRestoreTokenController.js";
import postLikeController from "./post/postLikeController.js";
import createCommentController from "./comment/createCommentController.js";
import deleteCommentController from "./comment/deleteCommentController.js";
import updateCommentController from "./comment/updateCommentController.js";

const setup = (app) => {
    const upload = multer({ storage: multer.memoryStorage() });

    app.post('/user', createUserValidator, createUserController);
    app.get('/user/:id/confirm/:registrationToken',checkUserMailController);
    app.post('/user/login', loginValidator, loginController);


    // controllo e spedico l'eventuale link di ripristino password sul FE
    app.get('/user/recovery-password/:email' , recoveryPasswordController);

    //controllo che il token di reset password sia ancora valido e lo dico al FE
    app.get('/password-reset/check-restore-token/:restoreToken', validRestoreTokenController)

    //aggiorno la password per l'utente
    app.post('/user/reset-password', resetPasswordValidator, updateUserPasswordController);

    //API per creazione post. Presenza di middleware di Multer per lavorare il file nel controller; posso quindi codificare
    //il file su mongoDB
    app.post('/post/create-post', upload.single('image'), createPostValidator, createPostController);

    app.get('/posts', getPostController);

    app.post('/post/like', postLikeController);

    app.post('/comment', createCommentController);

    app.patch('/comment/:commentId', updateCommentController);

    app.delete('/comment/:commentId', deleteCommentController);


    
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