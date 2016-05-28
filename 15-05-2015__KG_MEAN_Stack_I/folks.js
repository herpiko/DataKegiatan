var express = require('express');
var router = express.Router();  // inisiasi router express

var folksModel = require('./db'); // panggil model 

var bodyParser = require('body-parser');   // body-parser is used to parse POST data to an object
router.use(bodyParser.urlencoded({extended:true}));

var methodOverride = require('method-override');
router.use(methodOverride(function(req, res){   // ganti ganti req.body._method ke HTTP method.
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
      return res.send(err);  // Tangkap galat
    }
    res.render('folks/index',{ // Render berkas view folks/index.html, oper nilai title dan folks
      title : 'Pejuang',
      folks : result
    })
  })
})
.post(function(req, res){ // POST http://localhost:3000/folks
  folksModel.create({ // Simpan item baru. 
    name : req.body.name,  // Nilai POST tersimpan di req.body.namafield
    age : req.body.age,
    role : req.body.role,
  }, function(err, result){
    if (err) {
      return res.send(err);  // Tangkap galat
    }
    res.redirect('/folks'); // Alihkan ke halaman http://localhost:3000/folks
  })
})

router.route('/new')  
.get(function(req, res) { // GET http://localhost:3000/folks/new
  res.render('folks/new',{ // Render berkas view folks/new.html, oper nilai title dan folks
    title : 'Pejuang',
    folks : {}
  })
})

router.param('id', function(req, res, next, id) { // Tangkap parameter id 
  req.id = id;                                    // dan simpan ke req.id
  next();
})

router.route('/:id') // Tangani router yang memiliki parameter id, contoh http://localhost:3000/folks/123
.get(function(req, res){ // GET http://localhost:3000/folks/123
  folksModel.findById(req.id, function(err, result){
    if (err) {
      return res.send(err);  // Tangkap galat
    }
    console.log(result);
    res.render('folks/show',{ // Render berkas view folks/show.html, oper nilai title dan folks
      title : 'Pejuang',
      folk : result
    })
  })
})

router.route('/:id/edit') // Tangani router untuk menyunting berkas,  contoh http://localhost:3000/folks/123/edit
.get(function(req, res) { // GET http://localhost:3000/folks/123/edit // Ambil nilai item berdasarkan id, tampilkan data sebelum menyunting item
  folksModel.findById(req.id, function(err, result){ // cari berdasarkan req.id
    if (err) {
      return res.send(err);  // Tangkap galat
    }
    res.render('folks/edit',{  // Render berkas view folks/edit.html, oper nilai title dan folks
      title : 'Pejuang',
      folk : result
    })
  })
})
.put(function(req, res) { // PUT http://localhost:3000/folks/123/edit  // Perbarui item 
  folksModel.findById(req.id, function(err, folk) { // cari berdasarkan req.id
    folk.update({                 // Kemudian diperbarui
      name : req.body.name,       // Nilai POST diambil dari req.body.namafield
      age : req.body.age,
      role : req.body.role,
    }, function(err, result){
      if (err) {
        return res.send(err);  // Tangkap galat
      }
      res.redirect('/folks');  // alihkan ke http://localhost:3000/folks
    })
  })
})
.delete(function(req, res) { // DELETE http://localhost:3000/folks/123/edit
  folksModel.remove({_id: req.id}, function(err) { // hapus berdasarkan _id == req.id
    if (err) {
      return res.send(err);  // Tangkap galat
    }
    res.redirect('/folks');  // alihkan ke http://localhost:3000/folks
  })
})

module.exports = router;
