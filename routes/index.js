var express = require('express');
var router = express.Router();
var unirest = require("unirest");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()) {
    console.log('token', req.user.token)
    unirest.get('https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url)')
      .header('Authorization', 'Bearer ' + req.user.token)
      .header('x-li-format', 'json')
      .end(function (response) {
        console.log(response.body)
        res.render('index', { profile: response.body });
      })
  } else {
    res.render('index', {  });
  }
});

router.get('/logout', function(req, res, next){
  req.session = null
  res.redirect('/')
})


module.exports = router;

