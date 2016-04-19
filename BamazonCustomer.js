var mysql      = require('mysql');
var prompt     = require('prompt');

// create a dummy user 'me' so a potentially important password doesn't go out on web
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'Bamazon'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

//First Display All of the Items available for sale. This initial display, should include the ids, names, and prices of products for sale
 
  console.log('The solution is: ', rows[0].solution);
});

//Users should then be prompted with two messages. 
//The first message should ask them the ID of the product they would like to buy. 

//The second message should ask them how many of the product they would like to buy.





//Check if your store has enough quantity of the product to meet the customer's request. 
//If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.



//If your store DOES have enough of the product to meet the customer's request, you should fulfill their order. 
//This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity.
 
connection.end();