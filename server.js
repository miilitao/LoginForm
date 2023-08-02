const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { name } = require('ejs');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//load static 
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '/public/assets/')));

const dataSchema = new mongoose.Schema({
  name: String,
  email: String, 
  password: String,
});

const dataModel = mongoose.model('dataModel', dataSchema);

app.post('/register', (req, res) => {
  const myData = new dataModel (req.body);
  myData.save().then(item => {res.end("Item Salvo no banco de dados!")}).catch(err => {res.status(400).send("Não foi possível guardar esse item no banco de dados")})
});

//home route
app.get('/', (req, res) => {
  res.render('base', {title: "Login System"});
})

app.get('/register', (req, res) => {
  res.render('register.ejs');
})

app.get('/login', (req, res) => {
  res.render('login.ejs', {user: 'nameUser'} );
})

app.listen(port, ()=> {
  console.log('O servidor está rodando na porta 3000');
})

require("./database/connection");
