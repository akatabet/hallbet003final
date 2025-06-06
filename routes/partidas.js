const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware');
const { Partida } = require('../models');

// Listar todas as partidas
router.get('/', verificarToken, async (req, res) => {
  try {
    const partidas = await Partida.findAll();
    res.json(partidas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar partidas' });
  }
});

// Criar uma nova partida
router.post('/', verificarToken, async (req, res) => {
  try {
    const partida = await Partida.create(req.body);
    res.status(201).json(partida);
  } catch (err) {
    console.error('Erro ao criar partida:', err);
    res.status(500).json({ error: 'Erro ao criar partida' });
  }
});

module.exports = router;
