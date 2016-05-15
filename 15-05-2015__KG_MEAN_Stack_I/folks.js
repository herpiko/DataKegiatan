var express = require('express');
var router = express.Router();  // Initiate an express router

var folksModel = require('./db'); 

var bodyParser = require('body-parser');   // body-parser is used to parse POST data to an object
router.use(bodyParser.urlencoded({extended:true}));

var methodOverride = require('method-override');
router.use(methodOverride(function(req, res){   // override current method by req.body._method value
  if (req.body && typeof req.body === 'object'  && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

router.route('/') 
.get(function(req, res){ // GET http://localhost:3000/folks
  folksModel.find({}, function(err, result){
    if (err) {
      return res.send(err);  // Catch error
    }
    res.render('folks/index',{
      title : 'Pejuang',
      folks : result
    })
  })
})
.post(function(req, res){ // POST http://localhost:3000/folks
  folksModel.create({
    name : req.body.name,
    age : req.body.age,
    role : req.body.role,
  }, function(err, result){
    if (err) {
      return res.send(err);  // Catch error
    }
    res.redirect('/folks');
  })
})

router.route('/new')  
.get(function(req, res) { // GET http://localhost:3000/folks/new
  res.render('folks/new',{
    title : 'Pejuang',
    folks : {}
  })
})

router.param('id', function(req, res, next, id) {
  req.id = id;
  next();
})

router.route('/:id') 
.get(function(req, res){ // GET http://localhost:3000/folks/123
  folksModel.findById(req.id, function(err, result){
    if (err) {
      return res.send(err);  // Catch error
    }
    console.log(result);
    res.render('folks/show',{
      title : 'Pejuang',
      folk : result
    })
  })
})

router.route('/:id/edit')
.get(function(req, res) { // GET http://localhost:3000/folks/123/edit
  folksModel.findById(req.id, function(err, result){
    if (err) {
      return res.send(err);  // Catch error
    }
    res.render('folks/edit',{
      title : 'Pejuang',
      folk : result
    })
  })
})
.put(function(req, res) { // PUT http://localhost:3000/folks/123/edit        overrided method
  folksModel.findById(req.id, function(err, folk) {
    folk.update({
      name : req.body.name,
      age : req.body.age,
      role : req.body.role,
    }, function(err, result){
      if (err) {
        return res.send(err);  // Catch error
      }
      res.redirect('/folks');
    })
  })
})
.delete(function(req, res) { // DELETE http://localhost:3000/folks/123/edit       overrided method
  folksModel.remove({_id: req.id}, function(err) {
    if (err) {
      return res.send(err);  // Catch error
    }
    res.redirect('/folks');
  })
})

module.exports = router;
