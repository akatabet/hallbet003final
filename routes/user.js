const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { User } = require('../models');

const router = express.Router();

router.get('/perfil', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'nome', 'email', 'criado_em'],
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
