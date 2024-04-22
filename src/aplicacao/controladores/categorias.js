const knex = require("../banco/bancoDeDados");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex("categorias").select("*");
    res.status(200).json({ categorias });
  } catch (error) {
    console.error("Erro ao recuperar categorias:", error);
    res.status(500).json({ error: respostas.erroInterno });
  }
};

module.exports = {
  listarCategorias,
};
