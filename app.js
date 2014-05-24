
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

var app = express();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req,res){

   mongo.Db.connect(mongoUri, function (err, db) {
   db.collection('bims', function(er, collection) {
       collection.findOne({"city": "Ankara"},function(err,data) {
           console.log(data);res.render('index', data);
       });
     });
   });
});

app.post('/near',function(req,res){
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('bims', function(er, collection) {
      collection.find({loc: {$near: [req.param('llat'),req.param('llong')], $maxDistance: 500}}).toArray(function(err,data) { 
            res.json(data); 
      }); 
    });
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Listening on port " + app.get('port'));
});
