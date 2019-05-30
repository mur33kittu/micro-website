const express = require('express');
const next = require('next');
const port = 1004;
const isProduction = process.env.NODE_ENV === 'production';

const app = next({
    isProduction,
    dev: !isProduction,
    isDevelopment: !isProduction,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/items', (req, res) => app.render(req, res, '/items'));

    server.get('/items/:id', (req, res) => {
      return app.render(req, res, '/item', Object.assign({id: req.params.id}, req.query))
    });

    server.get('/*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if(err) throw err
        console.log(`> Read on http://localhost:${port}`);
    })
});

