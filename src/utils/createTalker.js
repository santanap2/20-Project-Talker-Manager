const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const createTalker = async (newTalker) => {
  fs.writeFile(talkersPath, newTalker);
};

module.exports = createTalker;
