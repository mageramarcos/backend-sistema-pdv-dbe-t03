const { Router } = require("express");

const usuarios = require("../aplicacao/controladores/usuarios");

const produtos = require("../aplicacao/controladores/produtos");

const validarCorpoRequisicao = require("../aplicacao/intermediarios/validarCorpoRequisicao");

const {
  schemaUsuarios,
  schemaLogin,
} = require("../aplicacao/schemas/schemaUsuarios");

const schemaProdutos = require("../aplicacao/schemas/schemaProdutos");

const { listarCategorias } = require("../aplicacao/controladores/categorias");

const verificacao = require("../aplicacao/intermediarios/validarToken");


const rotas = Router();

rotas.get("/categorias", listarCategorias);

rotas.post(
  "/usuario",
  validarCorpoRequisicao(schemaUsuarios),
  usuarios.cadastrarUsuarios
);

rotas.post("/login", validarCorpoRequisicao(schemaLogin), usuarios.login);

rotas.use(verificacao);

rotas.put(
  "/usuario",
  validarCorpoRequisicao(schemaUsuarios),
  usuarios.atualizarUsuario
);

rotas.get("/usuario", usuarios.obterPerfilUsuario);

rotas.post(
  "/produto", 
  validarCorpoRequisicao(schemaProdutos),
  produtos.cadastrarProduto
 )

module.exports = rotas;
