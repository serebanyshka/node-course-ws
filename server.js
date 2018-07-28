const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const  now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', error => error && console.log(error));
  next();
});


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('sreamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'home',
    pageTitle: 'Home Page',
    message: 'Some message',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'about',
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({error: 'Page not found!'});
});
app.listen(PORT, () => {
  console.log(`Server is up to port ${PORT}`);
});
