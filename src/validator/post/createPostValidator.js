import validation from "express-joi-validation";
import Joi from "joi";

const validator = validation.createValidator({passError:true});
export default [
    validator.body(
        Joi.object().keys({
            title: Joi.string().required().max(100),
            image:Joi.object({
                mimetype: Joi.string()
                    .valid("image/jpeg", "image/png")
                    .required()
                    .messages({
                        "any.only": "Invalid file format. Only JPEG and PNG are allowed.",
                    }),
                size: Joi.number()
                    .max(5 * 1024 * 1024) // 5 MB
                    .required()
                    .messages({
                        "number.max": "File size exceeds the maximum limit of 5MB.",
                    }),
            }),

            body: Joi.string().required().max(200)

        })
    ),
]