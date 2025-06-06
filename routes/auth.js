const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ error: 'E-mail já registrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
      nome,
      email,
      senha: hashedPassword,
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno ao fazer login' });
  }
});

// Perfil protegido (JWT obrigatório)
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await User.findByPk(req.user.id, {
      attributes: ['id', 'nome', 'email', 'criado_em'],
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user: usuario });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

module.exports = router;
