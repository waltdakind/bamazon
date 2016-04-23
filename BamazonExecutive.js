var prompt = require('prompt');

var colors = require('colors');

var mysql = require('mysql');

			var connection = mysql.createConnection({
				host     : 'rcbexperimental.cpondcnopjzo.us-east-1.rds.amazonaws.com',
				user     : 'tempuser',
				password : 'tempPassword1234!',
				database : 'Bamazon'
			});
	// DepartmentID

	// DepartmentName	

	// OverHeadCosts	

	// ProductSales	

	// TotalProfit  
	//TotalProfit should not be stored in any database. You should use a custom alias.//