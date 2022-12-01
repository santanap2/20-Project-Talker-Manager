// iniciando projeto
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const getTalkers = require('./utils/getTalkers');
const createTalker = require('./utils/createTalker');
const { emailValidation, passwordValidation } = require('./middlewares/loginValidations');
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedValidation,
  rateValidation,
  currentIdValidation,
 } = require('./middlewares/talkerValidations');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

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

app.post('/login', emailValidation, passwordValidation, (req, res) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

app.post('/talker', 
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedValidation,
rateValidation,
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const id = Number(talkers[talkers.length - 1].id) + 1;
  const createdTalker = { name, id, age, talk };
  const all = JSON.stringify([...talkers, createdTalker], null, 2);
  await createTalker(all);
  res.status(201).json(createdTalker);
});

app.put('/talker/:id', 
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedValidation,
rateValidation,
currentIdValidation,
async (req, res) => {
  const talkers = await getTalkers();
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const index = talkers.findIndex((one) => one.id === Number(id));
  talkers[index] = { id: Number(id), name, age, talk };
  await createTalker(JSON.stringify(talkers, null, 2));
  res.status(200).json(talkers[index]);
});
