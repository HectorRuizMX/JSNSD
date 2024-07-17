import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import db from  './dbModel.js';

dotenv.config();
const port = process.env.PORT || 3002;

const server = express();

server.use(express.json());

server.get('/', (_, res) => {
    res.send('Hola, bienvenido a mi web server');
});

server.get('/fruits', (_, res, next) => {
    db.get((err, data) => {
        if(err) next(err);

        res.status(200).json(data);
    });
});

server.get('/fruits/:id', (req, res, next) => {
    db.getFruit(req.params.id, (err, data) => {
        if(err) next(err);

        res.status(200).json(data);
    });
});

server.post('/fruits', (req, res, next) => {
    db.post(req.body, (err, id) => {
        if(err) next(err);

        res.status(200).json({ id });
    });
});

server.put('/fruits/:id', (req, res, next) => {
    const { params } = req;
    db.put(params.id, req.body, (err, data) => {
        if(err) next(err);

        res.status(200).json(data);
    });
});

server.delete('/fruits/:id', (req, res, next) => {
    const { params } = req;
    db.del(params.id, (err, id) => {
        if(err) next(err);

        res.status(200).json({ id });
    });
});

server.use((_, res) => {
    res.status(404).json({ message: "not found" });
});

server.use((err, _, res) => {
    res.status(err.status ?? 500).json({ message: "internal server error" });
});


http.createServer(server).listen(port, () => {
    console.log(`Listening on port: ${port}`);
});