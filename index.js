const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db/db')

app.set('view engine','ejs')

//Routers
app.use('/', require('./routes/login'))

app.listen(PORT, console.log("Server is running on port " + PORT));