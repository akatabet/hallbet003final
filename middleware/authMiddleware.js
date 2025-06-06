const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded || !decoded.id) {
      return res.status(403).json({ error: 'Token inválido ou malformado' });
    }

    req.usuario = decoded; // Aqui vem { id: ... }

    next();
  });
}

module.exports = verificarToken;
