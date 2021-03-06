// Remote edit test
// Remote edit test2
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('Server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    pageTitle:'Maintenance Page',
    msgWelcome:'We will be right back'
  });
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
  //res.send('<h1>Hello Express</h1>');
    res.send({
      name:'Sarun',
      likes:[
        'Biking',
        'Cities'
      ]
    });
});

app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    msgWelcome: 'This is my Home page',
  });
});
app.get('/about',(req,res)=>{
//res.send('About Page');
res.render('about.hbs',{
  pageTitle:'About Page',
 });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  });
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
