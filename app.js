const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv/config');

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('We are on home!');
});

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

// Port
app.listen(3000);