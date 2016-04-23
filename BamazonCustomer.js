
//for taking customer input
			var prompt = require('prompt');
			//prettyness
			var colors = require('colors');
			//node package for database
			var mysql = require('mysql');

//defining these as global to access later
			var index = 0;
			var currentOrderQuantity = 0;
			var choice = 0;
			var currentOrderStockQuantity = 0;
			var updatedStockQuantity = 0;
			var queryString = '';

//database connetion details
//with the amazon aws database, this will database will work anywhere with internet
			var connection = mysql.createConnection({
				host     : 'rcbexperimental.cpondcnopjzo.us-east-1.rds.amazonaws.com',
				user     : 'tempuser',
				password : 'tempPassword1234!',
				database : 'Bamazon'
			});
//multiple question setup for prompt
			  var schema = {
			    properties: {
			      ItemID: {
			        message: 'What Item ID would you like?',
			        type: 'integer',
			        required: true
			      },
			      orderQuantity: {
			      	message: 'How many would you like to order?',
			      	type: 'integer',
			        required: true
			      }
			    }
			  };

//initiate connection
connection.connect(function(err){
	
			// If there is an error log it 
			if(err){
				console.error(colors.red("error connecting: " + err.stack));
				return;
			}

			// If we're connected tell us to which thread
			console.log(colors.green('connected as id ' + connection.threadId));
			console.log('');
			console.log(colors.rainbow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
			console.log(colors.rainbow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
			});


// First Display *All* of the Items available for sale. 
// This initial display, should include the ids, 
// names, and prices of products for sale

connection.query('SELECT * FROM Bamazon.Products', function(err, res){
	
	if (err) 
	{
		throw err;
	}

	// Print out the contents of the response
	// console.log(res);	name, cost, price
for(var i =0; i<res.length; i++) {
	console.log(colors.cyan(res[i].ItemID + ": " + res[i].name + ": $" + res[i].price ));
	console.log('');
	}


	console.log(colors.rainbow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
	console.log(colors.rainbow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));

// select item to buy prompt
prompt.message = colors.green("Your order:");
prompt.delimiter = colors.rainbow(" ~~###~~ ");

var customerPrompt = function(){prompt.start();

prompt.get(schema, function (err, result) {
		
		choice = result.ItemID;
		
		currentOrderQuantity = result.orderQuantity;
		index = choice - 1;

		if(choice > res.length || choice <= 0) {
			console.log(colors.red(choice + " is not a valid selection." ));
			//send back to prompt
			customerPrompt();
			return;			
		}
		else if(res[index].StockQuantity>0 && res[index].StockQuantity>currentOrderQuantity){
			currentOrderStockQuantity = res[index].StockQuantity;
			console.log(colors.yellow("You chose ItemID: " + choice));
			console.log(colors.yellow("Product Name: " + res[index].name));
			console.log(colors.yellow("Product Price: $" + res[index].price));
			console.log(colors.yellow('There are '  + currentOrderStockQuantity + ' in stock.'));
			console.log(colors.yellow('Your total comes to $'  + currentOrderQuantity *  res[index].price));
			updatedStockQuantity =  res[index].StockQuantity - currentOrderQuantity;
			console.log(colors.yellow(updatedStockQuantity + ' are remaining in stock'));
			//call the place order function
			var queryName = res[index].name;
			
			placeOrder(queryName);
		}
		else{
			console.log(colors.yellow("You chose: " + choice));
			console.log(colors.red(' We are out of stock of ' + res[index].name));
			//return to the prompt
			customerPrompt();
			return;
		}
})
}
customerPrompt();
var placeOrder = function(queryName){

	// If we're connected tell us to which thread
//	console.log(colors.green('connected as id ' + connection.threadId));
	console.log('');

	console.log(colors.rainbow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
	console.log(colors.rainbow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));

	console.log('');


			connection.query(
			  'UPDATE Products SET StockQuantity = ? Where name = ?',
			  [updatedStockQuantity, queryName],
			  function (err, result) {
			    if (err) throw err;
			    
			 //   console.log('Current amount in stock ' + res[index].StockQuantity);
			  }
			);
			customerPrompt();
			 }

});



