const express = require('express');
const app = express();
const dbconnexion = require('./db');
const dotenv = require('dotenv');
dotenv.config();

// Appeler cette fonction après dotenv.config();
dbconnexion();
// Au cas ou Error : Entity too large : solution limit : '50mb' (50mb est une limite haute ok pour le développement)
app.use(express.json({ limit: '50mb', extended: false }));

// Auth Routes
app.use('/api/users/register', require('./routes/api/users/register'));
app.use('/api/users/login', require('./routes/api/users/login'));

// Users Routes
app.use('/api/users/currentUser', require('./routes/api/users/currentUser'));
app.use('/api/users/update', require('./routes/api/users/update'));
app.use('/api/users/destroy', require('./routes/api/users/destroy'));
app.use('/api/users', require('./routes/api/users'));

// Categories Routes
app.use('/api/categories/create', require('./routes/api/categories/create'));

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`Server started on port : ${port}`);
