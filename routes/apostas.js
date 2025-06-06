const express = require('express');
const { Aposta, Partida } = require('../models');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

// Criar nova aposta
router.post('/', verificarToken, async (req, res) => {
  try {
    const { partida_id, tipo_aposta, valor_apostado, odd } = req.body;

    const novaAposta = await Aposta.create({
      partida_id,
      tipo_aposta,
      valor_apostado,
      odd,
      userId: req.usuario.id,
    });

    res.status(201).json(novaAposta);
  } catch (error) {
    console.error('Erro ao criar aposta:', error);
    res.status(500).json({ error: 'Erro ao criar aposta' });
  }
});

// Listar apostas do usuário autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const apostas = await Aposta.findAll({
      where: { userId: req.usuario.id },
      order: [['criado_em', 'DESC']],
    });

    res.json(apostas);
  } catch (error) {
    console.error('Erro ao listar apostas:', error);
    res.status(500).json({ error: 'Erro ao buscar apostas' });
  }
});

// Detalhes das apostas com dados da partida
router.get('/detalhes', verificarToken, async (req, res) => {
  try {
    const apostas = await Aposta.findAll({
      where: { userId: req.usuario.id },
      include: [{
        model: Partida,
        as: 'partida', // <- ESSA LINHA FOI CORRIGIDA
        attributes: ['time_casa', 'time_fora', 'data_hora']
      }],
      order: [['criado_em', 'DESC']]
    });

    res.json(apostas);
  } catch (error) {
    console.error('Erro ao buscar apostas com detalhes:', error);
    res.status(500).json({ error: 'Erro ao buscar apostas com detalhes' });
  }
});

module.exports = router;
