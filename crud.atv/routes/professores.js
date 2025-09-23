const express = require('express');
const router = express.Router();

// In-memory array to store teachers
let professores = [
  { id: 1, nome: 
    'Mateus Rodrgues',
     email: 'Mateus@gmail.com', 
     cpf: '11122233344',
      curso: 'Matemática',
    disciplina: 'Cálculo I' },
  { id: 2, 
    nome: 'Fabricio Firmino',
     email: 'Fabricio@gmail.com', 
     cpf: '55566677788', 
     curso: 'Física', 
     disciplina: 'Mecânica' }
];

let nextId = 3;

// Helper function to validate teacher data
const validateProfessor = (data) => {
  if (!data.nome || !data.email || !data.cpf || !data.curso || !data.disciplina) {
    return 'Todos os campos (nome, email, cpf, curso, disciplina) são obrigatórios';
  }
  if (professores.some(professor => professor.email === data.email || professor.cpf === data.cpf)) {
    return 'Email ou CPF já cadastrado';
  }
  return null;
};

// GET /professores - List all teachers
router.get('/', (req, res) => {
  res.json(professores);
});

// GET /professores/:id - Get teacher by ID
router.get('/:id', (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) {
    return res.status(404).json({ error: 'Professor não encontrado' });
  }
  res.json(professor);
});

// POST /professores - Create a new teacher
router.post('/', (req, res) => {
  const professor = { id: nextId++, ...req.body };
  const error = validateProfessor(professor);
  if (error) {
    return res.status(400).json({ error });
  }
  professores.push(professor);
  res.status(201).json(professor);
});

// PUT /professores/:id - Update a teacher
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const professorIndex = professores.findIndex(p => p.id === id);
  if (professorIndex === -1) {
    return res.status(404).json({ error: 'Professor não encontrado' });
  }
  const updatedProfessor = { id, ...req.body };
  const error = validateProfessor(updatedProfessor);
  if (error) {
    return res.status(400).json({ error });
  }
  professores[professorIndex] = updatedProfessor;
  res.json(updatedProfessor);
});

// DELETE /professores/:id - Delete a teacher
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const professorIndex = professores.findIndex(p => p.id === id);
  if (professorIndex === -1) {
    return res.status(404).json({ error: 'Professor não encontrado' });
  }
  professores = professores.filter(p => p.id !== id);
  res.status(204).send();
});

module.exports = router;