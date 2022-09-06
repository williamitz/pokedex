import * as  Joi from "joi";

export const EnvValidation = Joi.object({
    MONGO_URI: Joi.required(),
    PORT: Joi.number().default(3000),
    LIMIT_DEFAULT: Joi.number().default(5),
});