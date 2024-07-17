import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

dotenv.config();
const port = process.env.PORT || 3000;

const server = express();

server.get('/', (_, res) => {
    res.send('Hola, bienvenido a mi web server');
});

http.createServer(server).listen(port, () => {
    console.log(`Listening on port: ${port}`);
});