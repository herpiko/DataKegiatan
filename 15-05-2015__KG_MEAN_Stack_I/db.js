var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kelasglib');

var folkSchema = mongoose.Schema({
  name : String,
  role : String,
  age : Number,
});

mongoose.model('Folk', folkSchema);

module.exports = mongoose.model('Folk');

// Another example, please uncomment
/*
mongoose.model('Folk').create({          
  nama : 'Aris', 
  age : 91,
  role : 'Pejuang',
  address : 'somewhere'
}, function(err, result){
  if (err) {
    console.log(err);
    return process.exit();
  }
  console.log(result);
  return process.exit();
})


/*
mongoose.connection.once('open', function(){
  mongoose.connection.db.collection('folks', function(err, folks){
    if (err) {
      console.log(err);
      return process.exit();
    }
    folks.find({}).toArray(function(err, result){
      if (err) {
        console.log(err);
        return process.exit();
      }
      console.log(result);
      return process.exit();
    })
  })
})
*/
