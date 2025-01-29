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
import updateAvatarController from './user/updateAvatarController.js';
import getAvatarController from './user/getAvatarByUserId.js';
import randomAvatar from '../utils/randomAvatar.js';

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
import checkAuthorizationMiddleware from "../middleware/checkAuthorizationMiddleware.js";
import checkIfUserIsLoggedMiddleware from "../middleware/checkIfUserIsLoggedMiddleware.js";
import createCommentValidator from "../validator/comment/createCommentValidator.js";


const setup = (app) => {
    const upload = multer({ storage: multer.memoryStorage() });

    app.post('/user', createUserValidator, createUserController);
    app.get('/user/:id/confirm/:registrationToken',checkUserMailController);
    app.post('/user/login', loginValidator, loginController);
    app.get('/user/:userId/avatar', randomAvatar);
    app.get('/user/:userId/avatar', getAvatarController);


    // controllo e spedico l'eventuale link di ripristino password sul FE
    app.get('/user/recovery-password/:email' , recoveryPasswordController);

    //controllo che il token di reset password sia ancora valido e lo dico al FE
    app.get('/password-reset/check-restore-token/:restoreToken', validRestoreTokenController)

    //aggiorno la password per l'utente
    app.post('/user/reset-password', resetPasswordValidator, updateUserPasswordController);

    //API per creazione post. Presenza di middleware di Multer per lavorare il file nel controller; posso quindi codificare
    //il file su mongoDB
    app.post('/post/create-post', checkAuthorizationMiddleware, upload.single('image'), createPostValidator, createPostController);

    app.get('/posts', checkIfUserIsLoggedMiddleware, getPostController);

    app.post('/post/like', checkAuthorizationMiddleware, postLikeController);

    app.post('/comment',checkAuthorizationMiddleware, createCommentValidator, createCommentController);

    app.patch('/comment/:commentId',checkAuthorizationMiddleware, updateCommentController);

    app.delete('/comment/:commentId',checkAuthorizationMiddleware, deleteCommentController);

    //Route per l'update dell'avatar

    app.post('/user/:userId/avatar', updateAvatarController);


    
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