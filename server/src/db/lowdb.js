
const { JSONFile } = require('lowdb/node');
const { Low } = require('lowdb');


const defaultData = { 
  flashcards: [], 
  flashcardSets: []};


const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

const initDB = async () => {
  await db.read();
  db.data ||= defaultData();
  await db.write();
};

module.exports = { db, initDB };
