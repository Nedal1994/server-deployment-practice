'use strict';

const express = require('express');
require('dotenv').config();
const server = express();
const stamper = require('./middleware/stamper')
const notFoundHandler = require('./handlers/404')
const errorHandler = require('./handlers/500')

const PORT = process.env.PORT

// this is lab 1

function start(){
    server.listen(PORT,()=>{
    console.log(`${PORT}`)
})
}

server.get('/',(req,res)=>{
    res.status(200).send('Ok')
}
)

server.get('/data',stamper,(req,res)=>{
    const outputObject={
        10:'even',
        5:'odd',
        'time':req.timestamp
    }
    res.status(200).json.outputObject
}
)

// this is error

server.get('/bad',(req,res,next)=>{
    throw new Error('You have error')
}
)

server.use('*',notFoundHandler)
server.use(errorHandler)

module.exports={
    server, start
}