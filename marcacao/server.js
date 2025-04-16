// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro MongoDB:', err));

// Schema
const marcacaoSchema = new mongoose.Schema({
  local: String,
  data: String,
  dia: String,
  hora: String,
  nome: String
});

const Marcacao = mongoose.model('Marcacao', marcacaoSchema);

// Rotas

// GET /api/marcacoes/:local
app.get('/api/marcacoes/:local', async (req, res) => {
  const local = req.params.local;
  try {
    const dados = await Marcacao.find({ local });
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar marcações' });
  }
});

// POST /api/marcacoes
app.post('/api/marcacoes', async (req, res) => {
  try {
    const nova = new Marcacao(req.body);
    await nova.save();
    res.status(201).json({ mensagem: 'Marcaçao salva com sucesso!' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao salvar marcação' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
