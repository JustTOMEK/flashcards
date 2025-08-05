import { LowSync, MemorySync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

const defaultData = {
    flashcards: [],
    flashcardSets: [],
    users: [],
}

const createDB = (adapterType = 'json', filePath = 'db.json') => {
    const adapter =
        adapterType === 'memory' ? new MemorySync() : new JSONFileSync(filePath)

    console.log(adapter)

    const db = new LowSync(adapter, defaultData)

    const initDB = () => {
        db.read()
        db.data ||= { ...defaultData }
        db.write()
    }

    return { db, initDB }
}

export { createDB }
