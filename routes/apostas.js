const express = require('express');
const { Aposta } = require('../models');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

// Criar nova aposta
router.post('/', verificarToken, async (req, res) => {
  try {
    const { partida_id, tipo_aposta, valor_apostado } = req.body;

    if (!partida_id || !tipo_aposta || !valor_apostado) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const novaAposta = await Aposta.create({
      partida_id,
      tipo_aposta,
      valor_apostado,
      userId: req.userId, // vem do middleware
    });

    res.status(201).json(novaAposta);
  } catch (error) {
    console.error('Erro ao criar aposta:', error);
    res.status(500).json({ error: 'Erro ao criar aposta' });
  }
});

// Listar apostas do usuário logado
router.get('/', verificarToken, async (req, res) => {
  try {
    const apostas = await Aposta.findAll({ where: { userId: req.userId } });
    res.json(apostas);
  } catch (error) {
    console.error('Erro ao buscar apostas:', error);
    res.status(500).json({ error: 'Erro ao buscar apostas' });
  }
});

module.exports = router;
