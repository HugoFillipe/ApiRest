const express = require('express');
const server = express();
server.use(express.json());

const usuarios = []
const cursos = []

server.post('/usuarios', (req, res) => {
  const nome = req.body.nome;
  const idade = req.body.idade;
  const id = usuarios.length + 1;
  const cursos = []

  usuarios.push({
    id,
    nome,
    idade,
    cursos,
  });

  return res.status(201).json(usuarios);
});

server.get('/usuarios', (req, res) => {
  return res.status(200).json(usuarios);
});

server.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const idade = req.body.idade;

  usuarios[id - 1].idade = idade;

  return res.status(201).json(usuarios);
});

server.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;

  let indice = -1;

  usuarios.map((usuario, index) => {
    if (usuario.id === Number(id)) {
      indice = index;
    }
    return usuario;
  });

  if (indice === -1) {
    return res.status(400).json({ error: 'Não existe nenhum usuario com esse identificador! ' });
  }

  usuarios.splice(indice, 1);

  return res.status(200).send();
});

/*
    Listar os cursos 
*/
server.get('/usuarios/:id/cursos', (req, res) => {
  return res.status(200).json(cursos)
});

/*
    Incluir um curso 
*/
server.post('/usuarios/:id', (req, res) => {
  const idCurso = cursos.length + 1
  const nomeCurso = req.body.nomeCurso
  cursos.push({
      idCurso,
      nomeCurso
  })
  return res.status(200).json(cursos)
});

/*
    Alterar um curso 
*/
server.put('/usuarios/:id/:idCurso', (req, res) => {
  const idCurso = req.params.idCurso
  const nomeCurso = req.body.nomeCurso
  cursos[idCurso - 1].nomeCurso = nomeCurso
  return res.status(200).json(cursos)
});

/*
    Deletar um curso 
*/
server.delete('/usuarios/:id/:idCurso', (req, res) => {
  const id = req.params.id
  const idCurso = req.params.idCurso
  let indice = -1
  cursos.map((curso, index) => {
      if(curso.idCurso == Number(idCurso)) {
          indice = index
      }
      return curso
  })
  if(indice == - 1) {
      return res.status(400).json({error: "Não existe nenhum curso com esse identificador!  "})
  }
  cursos.splice(indice, 1)
  return res.status(200).send()
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/ ');
});
