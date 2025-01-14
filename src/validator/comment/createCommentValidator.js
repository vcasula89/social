import Joi from 'joi'
import validation from 'express-joi-validation'
const validator = validation.createValidator({passError:true});

export default [
    validator.body(
        Joi.object().keys({
            commentText: Joi.string().required().max(500),
            commentUserId: Joi.string().required(),
            postId: Joi.string().required(),
        })
    ),
]