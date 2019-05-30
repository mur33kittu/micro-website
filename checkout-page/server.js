const express = require('express');
const next = require('next');
const port = 1000;
const isProduction = process.env.NODE_ENV === 'production';

const app = next({
    isProduction,
    dev: !isProduction,
    isDevelopment: !isProduction,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/checkout', (req, res) => app.render(req, res, '/checkout'));

    server.get('/*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if(err) throw err
        console.log(`> Read on http://localhost:${port}`);
    })
});

