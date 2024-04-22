require("dotenv").config();
const app = require("./servidor");
const rotas = require("./rotas/rotas");

app.use(rotas);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

