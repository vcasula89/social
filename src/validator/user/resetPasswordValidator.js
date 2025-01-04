import Joi from 'joi'
import validation from 'express-joi-validation'

const validator = validation.createValidator({passError:true});

export default [
    validator.body(
        Joi.object().keys({
            password: Joi.string().required().min(8).alphanum(),
            token: Joi.required(),
        })
    ),
]