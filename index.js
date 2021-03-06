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
app.use('/api/users/auth', require('./routes/api/users/auth'));

// Users Routes
app.use('/api/users/currentUser', require('./routes/api/users/currentUser'));
app.use('/api/users/update', require('./routes/api/users/update'));
app.use('/api/users/destroy', require('./routes/api/users/destroy'));
app.use('/api/users', require('./routes/api/users'));

// Categories Routes
app.use('/api/categories/create', require('./routes/api/categories/create')); // Create
app.use('/api/categories', require('./routes/api/categories')); // Read
app.use('/api/categories/update', require('./routes/api/categories/update')); // Update
app.use('/api/categories/destroy', require('./routes/api/categories/destroy')); // Delete

// Articles Routes
app.use('/api/articles/create', require('./routes/api/articles/create'));
app.use('/api/articles/update', require('./routes/api/articles/update'));
app.use('/api/articles', require('./routes/api/articles'));

// Roles Routes
app.use('/api/roles/create', require('./routes/api/roles/create'));
app.use('/api/roles', require('./routes/api/roles'));
app.use('/api/roles/update', require('./routes/api/roles/update'));
app.use('/api/roles/destroy', require('./routes/api/roles/destroy'));

// Parse markdown to HTML
app.use('/api/steps', require('./routes/api/steps'));

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`Server started on port : ${port}`);
