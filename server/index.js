require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./models/Database');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname,"..","LogInForm")));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {httpOnly: true, maxAge: 60*60*1000 },
}))

require('./routes/Router.js')(app);

db.run();

app.listen(80);