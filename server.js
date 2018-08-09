const express = require('express'),
	  bodyParser = require('body-parser'),
	  db = require("./database/database"),
	  router = require('./routes/router'),
	  app = express();
	  

app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
db.connectDB();

app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});  
//var bodyParser = require('body-parser');

router.load(app, './controllers');
	  
	app.listen(8080, function () {  
	    
	 console.log('Example app listening on port 8080!')  
	});

