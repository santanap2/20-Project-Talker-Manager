// iniciando projeto
const express = require('express');
const bodyParser = require('body-parser');
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

app.use(express.json());

app.get('/talker', async (req, res) => {
  console.log('executou');
  try {
    const talkers = await getTalkers();
    res.status(200).send(talkers);
  } catch ({ message }) { 
    res.status(500).send({ message });
  }
});
