const app = require('./app')
const { initDB } = require('./db/lowdb')


const PORT = 3000



initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is at http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Error:', err)
    })
