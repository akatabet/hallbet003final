const express = require('express');
const { Aposta } = require('../models');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Registrar uma aposta (requer login)
router.post('/', verificarToken, async (req, res) => {
  try {
    const { id_partida, tipo_aposta, valor, odd } = req.body;

    const novaAposta = await Aposta.create({
      id_usuario: req.user.id,
      id_partida,
      tipo_aposta,
      valor,
      odd,
    });

    res.status(201).json({ message: 'Aposta registrada com sucesso', aposta: novaAposta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar aposta' });
  }
});

module.exports = router;
