const express = require('express');
const cors = require('cors');
const alunosRouter = require('./routes/alunos');
const professoresRouter = require('./routes/professores');

const app = express();

app.use(cors());
app.use(express.json());

// Map routers
app.use('/alunos', alunosRouter);
app.use('/professores', professoresRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});