module.exports = {
  string: {
    base: "Deve ser uma string",
    min: "Deve ter pelo menos {{#limit}} caracteres",
    max: "Deve ter no máximo {{#limit}} caracteres",
    length: "Deve ter exatamente {{#limit}} caracteres",
    email: "Deve ser um endereço de e-mail válido",
    uri: "Deve ser uma URI válida",
    alphanum: "Deve conter apenas caracteres alfanuméricos",
    regex: {
      base: "Não atende ao padrão esperado",
      name: 'Deve corresponder ao padrão "{{#name}}"',
    },
  },
  number: {
    base: "Deve ser um número",
    min: "Deve ser maior ou igual a {{#limit}}",
    max: "Deve ser menor ou igual a {{#limit}}",
    integer: "Deve ser um número inteiro",
    positive: "Deve ser um número positivo"
  },
  array: {
    base: "Deve ser uma lista",
    min: "Deve ter no mínimo {{#limit}} itens",
    max: "Deve ter no máximo {{#limit}} itens",
  },
  any: {
    required: 'O campo "{{#label}}" é obrigatório',
  },
};
