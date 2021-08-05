const express = require('express');
const app = express();
const dbconnexion = require('./db');
const dotenv = require('dotenv');
dotenv.config();

// Appeler cette fonction après dotenv.config();
dbconnexion();

app.use(express.json({ extended: false }));

app.use('/api/users/register', require('./routes/api/users/register'));
app.use('/api/users/login', require('./routes/api/users/login'));
app.use('/api/users/update', require('./routes/api/users/update'));
app.use('/api/users', require('./routes/api/users'));

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`Server started on port : ${port}`);
