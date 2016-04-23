var prompt = require('prompt');

var colors = require('colors');

var mysql = require('mysql');

			var connection = mysql.createConnection({
				host     : 'rcbexperimental.cpondcnopjzo.us-east-1.rds.amazonaws.com',
				user     : 'tempuser',
				password : 'tempPassword1234!',
				database : 'Bamazon'
			});

var manager = process.argv[2];

if(process.argv[3]!=null) {var option = process.argv[3];}
//send diff args to diff functions with switch / case
function manager(manager, option) {
switch(manager) {
    case 'viewProducts':
       // 1) View Products for Sale 
       	console.log(colors.rainbow('==============================='));
        viewProducts();  //make a function to do this
        break;

    case 'lowInventory':
    	console.log(colors.rainbow('==============================='));
    		// 2) View Low Inventory
    		// 
        lowInventory();  
        break;

    case 'addToInventory':
    	console.log(colors.rainbow('==============================='));
    	// 3) Add to Inventory 
    	if (productItem!=null){
    	addToInventory(num);
    }
        break;

    case 'addNewProduct':
    	console.log(colors.rainbow('==============================='));
  		// 4) Add New Product

  		addNewProduct();

        break;
    case 'help':
    	console.log(colors.rainbow('==============================='));
    	//list possible commands
    	//like an actual help file 
    			logAndDisplay('Give help here');

				break;
    default:
    	console.log(colors.red('==============================='));
        //give possible commands
        logAndDisplay('Command \'' + manager + '\' not recognized, type \'node liri help\' for list of commands');
        break;
}
