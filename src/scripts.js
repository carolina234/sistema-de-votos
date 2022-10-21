const express = require('express');
const cors = require('cors');
const path = require('path');
const { response } = require('express');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/img', express.static(path.join(__dirname, 'imagens')))


const cidadaos = [];
const votes = [];

const candidates = []



// criar candidatos
app.post("/candidate", (request, response) => {
  const { candidateName, candidateId, partyId, partyName, imageUrl } = request.body
  const candidato = candidates.find((candidate) => candidate.candidateId === candidateId);
  if (candidato) {
    return response.status(400).json({ errMsg: "Candidato ja cadastrado!" })
  }
  const candidate = {
    candidateId,
    candidateName,
    partyId,
    partyName,
    imageUrl,
    votes: 0
  }
  candidates.push(candidate);
  return response.status(201).json(candidate);
});


app.post('/cidadao', (request, response) => {
  const { name, username } = request.body;

  const cidadaoId = cidadaos.find((cidadao) => cidadao.username === username["x-bolovo-username"]);
  if (cidadaoId) {
    return response.status(400).json({ errMsg: "Cidadão  ja cadastrado!" })
  } 

  const cidadao ={
    username,
    name,
  }

  cidadaos.push(cidadao);
  console.log(cidadao)

  return response.status(201).json(cidadao);

})


app.get("/listadecandidatos", (request, response) => {

  return response.status(200).json(candidates);
});



app.get("/candidates/:candidateId", (request, response) => {
  const { candidateId } = request.params;
  const username = request.headers["x-bolovo-username"];

  const cidadaoId = cidadaos.find((cidadao) => cidadao.username === username);


  const ocandidatoexiste = candidates.find((candidate) => candidate.candidateId == candidateId)

  if (ocandidatoexiste == null) {
    return response.status(400).json({ errMsg: "candidato nao encontrado" })
  }
  console.log(ocandidatoexiste)
  console.log("Na data " + new Date().toLocaleString() + " o usuario " + `${username}` + " Fez uma Pesquisa de candidatos  ")
  return response.status(200).json(ocandidatoexiste);
});


app.post("/votes/:candidateId", (request, response) => {
  const { candidateId } = request.params;
  const username = request.headers["x-bolovo-username"];
  const { candidateName, partyName } = request.body;
   
  
  const candidate = candidates.find((candidate) => candidate.candidateId == candidateId)
  console.log(candidate)
  
  if(candidate == null){
    return response.status(400).json({ errMsg: "candidato nao encontrado" })
  }else{
    const vote = {
      "candidateId": candidate.candidateId,
     "username": username,
     "votes": ++candidate.votes
    };
    votes.push(vote)
  console.log("Na data " + new Date().toLocaleString() + " o usuario " + `${username}` + " fez a Confirmação do voto no " + `${candidateName}`)
  console.log(` ${username} seu voto foi confirmado no  ${candidateName} do partido ${partyName}`)
  }
  

  

  return response.json({ msg: `${username}, seu voto foi confirmado no candidato ${candidateName} do partido ${partyName}` })
  

})

app.get("/votos", (request, response ) => {
  return response.json(votes)
})



module.exports = app;