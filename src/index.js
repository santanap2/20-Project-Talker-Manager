// iniciando projeto
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const getTalkers = require('./getTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  try {
    const talkers = await getTalkers();
    res.status(200).send(talkers);
  } catch ({ message }) { 
    res.status(500).send({ message });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const talkers = await getTalkers();
    const talkerID = talkers.find((one) => one.id === Number(req.params.id));
    if (!talkerID) {
      return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    } 

    res.status(200).json(talkerID);
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

app.post('/login', (req, res) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    console.log(token);
    res.status(200).json({ token });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});
