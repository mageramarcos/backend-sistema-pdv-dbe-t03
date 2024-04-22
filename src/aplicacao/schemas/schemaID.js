const joi = require("joi");
const joiMessages = require("../respostas/respostasJoi");

const schemaID = joi.object({
    id: joi.number().integer().positive().required().messages({
        "number.base": joiMessages.number.base,
        "number.positive": joiMessages.number.positive,
        "number.integer": joiMessages.number.integer
    })
})

module.exports = schemaID