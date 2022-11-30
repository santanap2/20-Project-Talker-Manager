const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, './talker.json');

const getTalkers = async () => {
  try {
    const data = await fs.readFile(talkersPath, 'utf-8');
    return JSON.parse(data);
  } catch ({ message }) {
    return ({ message });
  }
};

module.exports = getTalkers;