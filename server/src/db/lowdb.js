const { Low } = require('lowdb')
const { JSONFile, Memory } = require('lowdb/node')

const defaultData = {
  flashcards: [],
  flashcardSets: [],
  users: [],
}

const createDB = (adapterType = 'json', filePath = 'db.json') => {
    const adapter =
    adapterType === 'memory'
        ? new Memory()
        : new JSONFile(filePath)

    const db = new Low(adapter, defaultData)

    const initDB = async () => {
    await db.read()
    db.data ||= { ...defaultData }
    await db.write()
    }

    return { db, initDB }
}

module.exports = { createDB }
