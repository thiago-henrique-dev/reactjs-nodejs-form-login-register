const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors');

require('./database');

const rotesAccount = require('./routes/accounts');

// Log das requisições a api
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // config para aceitar apenas json como entrada 


// Config cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next()
});



app.use('/', rotesAccount)


// Rota não encontrada!
app.use((req, res, next) => {
    const erro = new Error('Não encontrado.')
    erro.status = 404
    next(erro)
})

// Captura todo tipo de erro ligado a rota
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    console.log(error)
    return res.send({
        erro: {
            message: error.message
        }
    })
})

module.exports = app