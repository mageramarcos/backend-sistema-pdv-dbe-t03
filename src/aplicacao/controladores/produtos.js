const knex = require("../banco/bancoDeDados");
const respostas = require("../respostas/respostas");

const cadastrarProduto = async (req, res) =>{
    const {descricao, quantidade_estoque, valor,categoria_id} = req.body;
    console.log("passo 1 ok")
    try {
        const produto = await knex('produtos')
        .insert({descricao, quantidade_estoque, valor,categoria_id})
        .returning(["descricao", "quantidade_estoque", "valor","categoria_id"]);

        if(!produto){
           return res.status(400).json({mensagem: respostas.todosOsCamposObrigatorios});
        }
        return res.status(201).json(produto)

    } catch (error) {
        res.status(500).json({mensagem: respostas.erroInterno});
    }
}

module.exports = {
    cadastrarProduto
}