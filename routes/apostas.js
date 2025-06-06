const express = require('express');
const { Aposta } = require('../models');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

// Criar uma nova aposta (rota protegida)
router.post('/', verificarToken, async (req, res) => {
  try {
    const { partida_id, tipo_aposta, valor_apostado } = req.body;
    const user_id = req.usuario.id; // vem do token

    if (!partida_id || !tipo_aposta || !valor_apostado) {
      return res.status(400).json({ error: 'Dados incompletos para registrar aposta' });
    }

    const novaAposta = await Aposta.create({
      user_id,
      partida_id,
      tipo_aposta,
      valor_apostado
    });

    res.status(201).json(novaAposta);
  } catch (error) {
    console.error('Erro ao criar aposta:', error);
    res.status(500).json({ error: 'Erro ao criar aposta' });
  }
});

module.exports = router;
