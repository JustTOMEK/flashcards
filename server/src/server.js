
const cors = require('cors')
const express = require('express');
const flashcardsRouter = require('./routes/flashcards');
const { initDB } = require('./db/lowdb'); 

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use('/flashcards', flashcardsRouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error:', err);
});
