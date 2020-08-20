const express = require('express');
const config = require('./config');
const helmet = require('helmet');
const routes = require('./routes');
const xss = require('xss-clean');



const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.use('/map', routes);

module.exports = app;