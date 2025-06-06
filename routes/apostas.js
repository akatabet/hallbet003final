const express = require('express');
const { Aposta } = require('../models');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

// Criar aposta
router.post('/', verificarToken, async (req, res) => {
  try {
    const { partida_id, tipo_aposta, valor_apostado, odd } = req.body;
    const userId = req.user.id;

    const novaAposta = await Aposta.create({
      partida_id,
      tipo_aposta,
      valor_apostado,
      odd,
      userId, // <- pega do token
    });

    res.status(201).json(novaAposta);
  } catch (error) {
    console.error('Erro ao criar aposta:', error);
    res.status(500).json({ error: 'Erro ao criar aposta' });
  }
});

module.exports = router;
