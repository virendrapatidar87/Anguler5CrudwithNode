const mongo = require("mongoose");

class DBConnectivity{
	constructor(){
		
	}
	connectDB(){
		const db = mongo.connect("mongodb://localhost:27017/Person", function(err,
				response) {
			if (err) {
				console.log(err);
			} else {
				console.log('Connected to ' + db, ' + ', response);
			}
		});
		
	}
}

module.exports =new DBConnectivity();