const jwt = require("jsonwebtoken");
const senhaJWT = process.env.SENHAJWT;

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  const tokenSemBearer = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(tokenSemBearer, senhaJWT);

    req.usuario = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ mensagem: "Token inválido." });
  }
};

module.exports = {
  verificarToken,
};
