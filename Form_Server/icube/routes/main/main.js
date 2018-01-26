var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
  res.render('login.ejs', {})
});

router.post('/login', function(req, res){
  var user = req.body.user;
  res.cookie('user', user);
  //later retrieve user info from REST/db
  if(user == 'Super User')
    res.redirect('/menu');
  else
    res.redirect('/message');
})

router.get('/menu', function(req, res){
  res.sendFile('menu.html', {root: '/opt/msi/icube/public'})
})

router.get('/logout', function(req, res){
  //console.log('cookies: ', req.cookies.user)
  res.clearCookie('user')
  res.redirect('/');
})

module.exports = router
