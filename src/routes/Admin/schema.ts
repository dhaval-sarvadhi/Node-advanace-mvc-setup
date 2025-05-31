import Joi from 'joi';
/**
 * @file Admin schema validation using Joi
 * @module routes/Admin/schema
 * @requires joi
 */
export default {
    addAdminSchema: Joi.object({
        first_name: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'First name is required',
                'string.min': 'First name must be at least 2 characters',
            }),

        last_name: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'Last name is required',
                'string.min': 'Last name must be at least 2 characters',
            }),

        email: Joi.string()
            .trim()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
            }),

        password: Joi.string()
            .min(6)
            .max(128)
            .required()
            .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 6 characters',
            }),

        role: Joi.string()
            .valid(1, 2) // add your valid roles here
            .required()
            .messages({
                'any.only': 'Role must be either admin or superadmin',
                'string.empty': 'Role is required',
            }),
    })
};