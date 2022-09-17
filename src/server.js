'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('underscore');
const fetch = require('node-fetch');
const https = require('https');
var config = require('./config/config.js');
var routes = require('./routes/routes.js');
var Knexx = require('./config/knex.js');
const { Model } = require('objection');
Model.knex(Knexx.knex);

var app = express();

// Middleware functions
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/get_products', (request, response, next) => {
    // fetch('https://fakestoreapi.com/products/1')
    // .then(res=>{
    //     console.log(res.json());
    //     res.json();
    // })
    // .then(json=>{
    //     console.log(json);
    //     response.status(200).json(json);
    // });
    https.get('https://fakestoreapi.com/products', (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                console.log(json, "Original Data");
                response.status(200).json({data: json});
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
});

// Routes
app.use('/api', routes);

app.listen(config.server.port, (req, res) => {
    if (config.server.host != 'localhost' && config.server.host != '0.0.0.0') {
        console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
    } else {
        config.server.host = 'localhost';
        console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
    }
});

module.exports = app;