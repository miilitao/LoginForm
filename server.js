const express = require('express');
const path = require('path');
const { name } = require('ejs');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('./database/connection');
const { connect } = require('http2');
const session = require('express-session');

app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

//load static 
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '/public/assets/')));

//home route
app.get('/', (req, res) => {
  res.render('base', {title: "Login System"});
})

app.get('/register', (req, res) => {
  res.render('register.ejs');
})

app.get('/dashboard', (req, res) => {
  const userName = req.session.userName;
  res.render('dashboard.ejs', {user: userName} );
});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String, 
  password: String
});

app.post('/register', (req, res) => {

const myData = mongoose.model("collection", UserSchema);

const newData = new myData({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password,
});

newData.save().then(() => {console.log('Dados salvos no banco de dados!')}).catch(() => {console.log('Erro!')})

res.redirect('/');

});

app.post('/', async (req, res) => {
  const myData = mongoose.model("collection", UserSchema);
  const email = req.body.email;
  const password = req.body.password;
  
  try {
      const user = await myData.findOne({ email: email });
      if (user && user.password === password) {
        req.session.userName = user.name;
        res.redirect('/dashboard');
      } else {
          res.redirect('/');
      }
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

app.listen(port, ()=> {
  console.log('O servidor está rodando na porta 3000');
})
