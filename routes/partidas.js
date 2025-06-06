const express = require('express');
const { Partida } = require('../models');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Listar partidas (requer login)
router.get('/', verificarToken, async (req, res) => {
  try {
    const partidas = await Partida.findAll();
    res.json(partidas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar partidas' });
  }
});

module.exports = router;
