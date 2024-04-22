// controladores.js
const knex = require("../banco/bancoDeDados");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const respostas = require("../respostas/respostas");
const senhaJWT = process.env.SENHAJWT;
const { verificarToken } = require("../intermediarios/verificaToken");

const criptografarSenha = async (senha) => {
  try {
    return await bcrypt.hash(senha, 10);
  } catch (error) {
    throw error;
  }
};

const cadastrarUsuarios = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailMinusculo = email.toLowerCase();

    const verificarDuplicidade = await knex("usuarios").where(
      "email",
      "=",
      emailMinusculo
    );

    if (verificarDuplicidade.length > 0) {
      return res.status(400).json({ mensagem: respostas.emailEmUso });
    }

    const criptografiaSenha = await criptografarSenha(senha);

    const usuario = await knex("usuarios")
      .insert({ nome, email: emailMinusculo, senha: criptografiaSenha })
      .returning(["nome", "email"]);

    if (!usuario || usuario.length === 0) {
      return res.status(400).json({ mensagem: respostas.emailSenha });
    }

    return res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: respostas.erroInterno });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    verificarToken(req, res, async () => {
      const idUsuarioNoToken = req.usuario.id;

      const emailMinusculo = email.toLowerCase();

      const usuarioExistente = await knex("usuarios")
        .where("email", "=", emailMinusculo)
        .whereNot("id", "=", idUsuarioNoToken)
        .first();

      if (usuarioExistente) {
        return res.status(400).json({ mensagem: respostas.emailEmUso });
      }

      let senhaCriptografada = senha;
      if (senha) {
        senhaCriptografada = await criptografarSenha(senha);
      }

      const usuarioAtualizado = await knex("usuarios")
        .where("id", "=", idUsuarioNoToken)
        .update({ nome, email: emailMinusculo, senha: senhaCriptografada })
        .returning(["nome", "email"]);

      if (!usuarioAtualizado || usuarioAtualizado.length === 0) {
        return res
          .status(404)
          .json({ mensagem: respostas.usuarioEmailNaoEncontrado });
      }

      return res.status(200).json(usuarioAtualizado);
    });
  } catch (error) {
    return res.status(500).json({ mensagem: respostas.erroInterno });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where("email", "=", email);

    if (!usuario || usuario.length === 0) {
      return res
        .status(404)
        .json({ mensagem: respostas.emailOuSenhaInvalidos });
    }

    const senhaValida = await bcrypt.compare(senha, usuario[0].senha);

    if (!senhaValida) {
      return res
        .status(400)
        .json({ mensagem: respostas.emailOuSenhaInvalidos });
    } else {
      const token = jwt.sign({ id: usuario[0].id }, senhaJWT, {
        expiresIn: "8h",
      });
      return res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ mensagem: respostas.erroInterno });
  }
};

const obterPerfilUsuario = async (req, res) => {
  try {
    verificarToken(req, res, async () => {
      const usuario = await knex("usuarios")
        .where("id", "=", req.usuario.id)
        .select(["nome", "email"])
        .first();

      if (!usuario) {
        return res
          .status(404)
          .json({ mensagem: respostas.usuarioEmailNaoEncontrado });
      }

      return res.status(200).json(usuario);
    });
  } catch (error) {
    return res.status(500).json({ mensagem: respostas.erroInterno });
  }
};

module.exports = {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
  obterPerfilUsuario,
};
