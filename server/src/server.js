import { app, initApp } from './app.js'

const PORT = 3000

const startServer = async () => {
    try {
        await initApp()
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (err) {
        console.error('Failed to initialize DB:', err)
    }
}

startServer()
