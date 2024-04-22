const joi = require("joi");
const joiMessages = require("../respostas/respostasJoi");

const schemaUsuarios = joi.object({
  nome: joi.string().required().messages({
    "string.base": joiMessages.string.base,
    "string.required": joiMessages.any.required,
  }),
  email: joi.string().email().required().messages({
    "any.required": joiMessages.any.required,
    "string.base": joiMessages.string.base,
    "string.email": joiMessages.string.email,
    "string.required": joiMessages.any.required,
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": joiMessages.any.required,
    "string.base": joiMessages.string.base,
    "string.min": joiMessages.string.min,
    "string.required": joiMessages.any.required,
  }),
});
const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "any.required": joiMessages.any.required,
    "string.base": joiMessages.string.base,
    "string.email": joiMessages.string.email,
    "string.required": joiMessages.any.required,
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": joiMessages.any.required,
    "string.base": joiMessages.string.base,
    "string.min": joiMessages.string.min,
    "string.required": joiMessages.any.required,
  }),
});


module.exports = {
  schemaUsuarios,
  schemaLogin
};
