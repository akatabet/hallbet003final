const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário', details: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });
    res.json({ message: 'Login bem-sucedido', user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login', details: err });
  }
});

module.exports = router;
