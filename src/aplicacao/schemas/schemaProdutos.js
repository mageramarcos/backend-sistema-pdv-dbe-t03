const joi = require("joi");
const joiMessages = require("../respostas/respostasJoi");

const schemaProdutos = joi.object({
    descricao: joi.string().required().messages({
        "string.base": joiMessages.string.base,
        "string.required": joiMessages.any.required,
    }),
    quantidade_estoque: joi.number().positive().integer().required().messages({
        "number.base": joiMessages.number.base,
        "number.positive": joiMessages.number.positive,
        "number.integer": joiMessages.number.integer
    }),
    valor: joi.number().positive().required().messages({
        "number.base": joiMessages.number.base,
        "number.positive": joiMessages.number.positive
    }),
    categoria_id: joi.number().positive().max(9).required().messages({
        "number.base": joiMessages.number.base,
        "number.positive": "categoria deve ser de 1 a 9",
        "number.max": "categoria deve ser de 1 a 9"
    })
})

module.exports = schemaProdutos