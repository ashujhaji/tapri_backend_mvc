let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./routes/routes');
let db = require('./database/dbConnection');
let app = express();


//connect to database
db.connectToDb();



//configue app setups
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',routes);



//listen for request
app.listen(3000, function(){
	console.log(`Server started on port 3000`)
});
