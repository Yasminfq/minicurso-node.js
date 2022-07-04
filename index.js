const express = require('express'); //importando o express
const app = express();

//configuracao do prisma
const { PrismaClient } = require("@prisma/client");
const { request } = require('http');
const { response } = require('express');
const prisma = new PrismaClient()

//configuração para aceitar json
app.use(express.json())

//rota get - puxar dados
app.get("/", (request, response)=> {
    return response.send("Hello Word!");
});

//rota post - receber dados
app.post("/form", async (request, response)=> {
    // console.log(request.body)

    const {nome,email,senha } = request.body
    await prisma.usuario.create({
        data: {
            nome,
            email,
            senha
        }
    })
    return response.status(201).send("Usuario criado com sucesso!");
});

//listagem de usuarios
app.get("/usuarios", async(request, response) => {
    const usuarios = await prisma.usuario.findMany()
    return response.status(200).send(usuarios)
});

//iniciar o servidor
app.listen(3030, ()=> {
    console.log("Servidor rodando!");
});