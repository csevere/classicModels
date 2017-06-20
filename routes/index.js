var express = require('express');
var router = express.Router();
var config = require('../config/config'); 

var mysql = require('mysql'); 

var connection = mysql.createConnection({
	host: config.host,
	user: config.userName,
	password: config.password,
	database: config.database
	
})




/* GET home page. */
router.get('/', function(req, res, next){
	//selecting everything from the table productlines 
	var selectQuery = "SELECT productLine FROM productlines"; 
	connection.query(selectQuery,(error, results)=>{
		res.render('index', {
		  resultArray: results 
		});

	}) 
  	
});



// add a post route to post info from database 
router.post('/', (req, res)=>{
	var productLine = req.body.productLine
	var selectQuery = "SELECT productLine FROM productlines WHERE productLine=" + productLine; 

	connection.query(selectQuery,[productLine],(error, results)=>{ 
		if(error) throw error;
	})

});

/* GET description page. */
router.get('/description', function(req, res, next){
	//selecting everything from the table productlines 
	//the correct way to query two columns from a table 
	var selectQuery = "SELECT textDescription, productLine FROM productlines"; 
	connection.query(selectQuery,(error, results)=>{
		//make sure you render the right page in res.render
		//use res.json to see if your result are getting right info or any info
		// res.json(results);
		res.render('description', {
		  resultArray: results 
		});
	console.log("TEST2")

	}) 
  	
});


// add a post route to post info from database 
router.post('/description', (req, res)=>{
	var productLine = req.body.productLine;
	var textDescription = req.body.textDescription;
	var selectQuery = "SELECT textDescription FROM productlines WHERE productLine=?" + productLine; 
	connection.query(selectQuery,[productLine, textDescription],(error, results)=>{ 
		if(error) throw error;
	})


});




module.exports = router;
