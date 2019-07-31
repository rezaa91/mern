const express = require('express');
const mongoose = require('mongoose');
const posts = require('./routes/api/posts/posts');
const users = require('./routes/api/users/users');
const auth = require('./routes/api/auth/auth');

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to database'));
db.once('open', () => console.log('database connected'));

const app = express();

app.use(express.json());
app.use('/api/posts/', posts);
app.use('/api/users/', users);
app.use('/api/auth/', auth);

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
