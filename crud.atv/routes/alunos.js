const express = require('express');
const router = express.Router();

// In-memory array to store students
let alunos = [
  { id: 1, nome: 'Mateus Rodrgues',
     email: '    Mateus@gmail.com',
     cpf: '12345678901', 
     telefone: '11987654321', 
     dataNascimento: '2000-01-15' },
  { id: 2, nome: 'Fabricio Firmino',
     email: 'Firmino@gmail',
      cpf: '98765432109',
       telefone: '11912345678',
        dataNascimento: '1999-05-20' }
];

let nextId = 3;

// Helper function to validate student data
const validateAluno = (data) => {
  if (!data.nome || !data.email || !data.cpf || !data.telefone || !data.dataNascimento) {
    return 'Todos os campos (nome, email, cpf, telefone, dataNascimento) são obrigatórios';
  }
  if (alunos.some(aluno => aluno.email === data.email || aluno.cpf === data.cpf)) {
    return 'Email ou CPF já cadastrado';
  }
  return null;
};

// GET /alunos - List all students
router.get('/', (req, res) => {
  res.json(alunos);
});

// GET /alunos/:id - Get student by ID
router.get('/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  res.json(aluno);
});

// POST /alunos - Create a new student
router.post('/', (req, res) => {
  const aluno = { id: nextId++, ...req.body };
  const error = validateAluno(aluno);
  if (error) {
    return res.status(400).json({ error });
  }
  alunos.push(aluno);
  res.status(201).json(aluno);
});

// PUT /alunos/:id - Update a student
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const alunoIndex = alunos.findIndex(a => a.id === id);
  if (alunoIndex === -1) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  const updatedAluno = { id, ...req.body };
  const error = validateAluno(updatedAluno);
  if (error) {
    return res.status(400).json({ error });
  }
  alunos[alunoIndex] = updatedAluno;
  res.json(updatedAluno);
});

// DELETE /alunos/:id - Delete a student
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const alunoIndex = alunos.findIndex(a => a.id === id);
  if (alunoIndex === -1) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  alunos = alunos.filter(a => a.id !== id);
  res.status(204).send();
});

module.exports = router;