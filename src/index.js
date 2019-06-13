const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors') //para ser acessível por qualquer aplicação

//cria um servidor
const app = express()

const server = require('http').Server(app) //protocolo http

const io = require('socket.io')(server) // protocolo websocket

//add mongoose para lidar com o mongoDB

//Conecta com op mongo utilizando user e senha
mongoose.connect('mongodb+srv://USUARIO:SENHA@cluster0-rgphg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})


//informações
//pesqusar sequelize para bancos relacionais

//real time
app.use((req, res, next) => {
    req.io = io

    next()
}) 

app.use(cors()) //para ser acessível por qualquer aplicação

//rota para arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

server.listen(3334) 
