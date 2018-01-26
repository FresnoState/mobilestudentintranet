var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var message = require('./modules/message');

router.post('/', function(req, res){
  message.send(req.body, req.cookies.user, ()=>{
    res.sendFile('messageSent.html', {root: '/opt/msi/icube/public'})
  })
})

router.get('/', function(req, res){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://mobile-api.innovate.fresnostate.edu/channel')
  .then((response)=>response.json())
  .then((responseJSON)=>{
    res.render('messageForm.ejs', {icube: responseJSON.icube})
  })
  .catch(err=>console.log(err))
});

module.exports = router
