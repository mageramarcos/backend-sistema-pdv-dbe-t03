const jwt = require("jsonwebtoken");
const senhaJwt = process.env.SENHAJWT;
const knex = require("../banco/bancoDeDados");
const respostas = require("../respostas/respostas");

const verificacao = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: respostas.naoAutorizado });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, senhaJwt);
    req.usuario = await knex("usuarios")
      .select("nome", "email")
      .where("id", "=", id);
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: respostas.naoAutorizado });
  }
};

module.exports = verificacao;
