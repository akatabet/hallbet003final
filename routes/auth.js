
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models'); // Certifique-se de que seu model está nomeado corretamente

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Validação simples
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    // Verificar se o usuário já existe
    const existe = await User.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Criar o usuário
    const novoUsuario = await User.create({ nome, email, senha: senhaCriptografada });

    return res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário', details: error.message });
  }
});

module.exports = router;
