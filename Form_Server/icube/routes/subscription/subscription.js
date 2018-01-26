var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/*', function(req, res, next) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/channel')
  .then((response)=>response.json())
  .then((responseJSON)=>{
    res.locals.icube = responseJSON.icube;
    next();
  })
  .catch(err=>console.log(err))
})

//prototype form only
router.get('/', function(req, res){
  res.render('subsForm.ejs', {icube: res.locals.icube})
})

router.get('/add_area', function(req, res){
  res.render('addArea.ejs', {icube: res.locals.icube})
})

router.get('/add_subject', function(req, res){
  res.render('addSubject.ejs', {icube: res.locals.icube})
})

router.get('/manage_areas', function(req, res){
  res.render('manageAreas.ejs', {icube: res.locals.icube})
})

router.get('/manage_subjects', function(req, res){
  res.render('manageSubjects.ejs', {icube: res.locals.icube})
})

router.post('/add_area', function(req, res){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/area/'+req.body.channelID, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            "name": req.body.name,
            "desc": req.body.desc
          })
  })
  .then(()=>{
    res.redirect('/menu');
  })
  .catch(err=>console.log(err))
})

router.post('/add_subject', function(req, res){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/subject/'+req.body.channelID+'/'+req.body.areaID, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            "name": req.body.name,
            "desc": req.body.desc,
            "opt": {
              "level": req.body.level,
              "distribution": req.body.dist
            }
          })
  })
  .then(()=>{
    res.redirect('/menu');
  })
  .catch(err=>console.log(err))
})

router.post('/update_area', function(req, res){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/area/'+req.body.channelID+'/'+req.body.areaID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            "name": req.body.name,
            "desc": req.body.desc
          })
  })
  .then(()=>{
    res.redirect('/menu');
  })
  .catch(err=>console.log(err))
})

router.post('/update_subject', function(req, res){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/subject/'+req.body.channelID+'/'+req.body.areaID+'/'+req.body.subjectID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            "name": req.body.name,
            "desc": req.body.desc,
            "opt": {
              "level": req.body.level,
              "distribution": req.body.dist
            }
          })
  })
  .then(()=>{
    res.redirect('/menu');
  })
  .catch(err=>console.log(err))
})

router.post('/delete_area', function(req, res){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/area/'+req.body.channelID+'/'+req.body.areaID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(()=>{
    res.redirect('/menu');
  })
  .catch(err=>console.log(err))
})

router.post('/delete_subject', function(req, res){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/subject/'+req.body.channelID+'/'+req.body.areaID+'/'+req.body.subjectID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(()=>{
    res.redirect('/menu');
  })
  .catch(err=>console.log(err))
})

module.exports = router
