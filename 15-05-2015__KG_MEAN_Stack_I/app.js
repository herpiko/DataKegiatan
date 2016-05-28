var express = require('express'); // panggil modul
var http = require('http'); // panggil modul
var path = require('path');

var db = require('./db'); // db / model
var folks = require('./folks'); // router + controller

var port = '3000'; // tentukan port
var app = express(); // inisiasi apps express

var exphbs = require('express-handlebars'); // pasang engine template HB
app.set('views', path.join(__dirname, 'views')); //
app.engine('handlebars', exphbs({defaultLayout: 'main'})); //
app.set('view engine', 'handlebars'); //

app.use(express.static(path.join(__dirname, 'public')));  //
app.use('/folks', folks); // pasang router ke app localhost/folks
app.use('/', function(req, res){
  res.send('hello');
}); // pasang router ke app

app.set('port', port); // tentukan port di app
var server = http.createServer(app); // bungkus app dengan modul webserver
server.listen(port); // jalankan, webserver mendengar di port 3000

server.on('listening', function(){  // event, kalau server sudah di posisi listening,
  console.log('running on ' + port + '...');  // maka cetak pesan ini
})
server.on('error', function(err) { // kalau ada event error, tangkap.
  console.log(err);
})
