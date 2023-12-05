const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  try {
    if (!header) {
      throw new Error("Header invalido");
    }

    const token = header.split(" ")[1];

    if (!token) {
      throw new Error("Token não fornecido");
    }

    JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        console.error("Erro ao verificar o token:", error.message);
        return res.status(401).send({
          message: "Erro encontrado ao realizar a autenticação",
          success: false,
          error: error.message,
        });
      } else {
        req.body.userId = decode.id;
        return next();
      }
    });
  } catch (error) {
    console.error("Erro ao processar o token:", error.message);
    res.status(401).send({
      message: "Autenticação Falhou",
      success: false,
      error: error.message, // Adiciona detalhes sobre o erro
    });
  }
};
