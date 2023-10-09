require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const route = require('./routes/index');
const db = require('./models');
db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
})
const SERVER_PORT = process.env.APP_PORT || 5000

//use cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(route);

// Error Handling General
app.use((err, req, res) => {
 res.json({
   message: err.message
 });
});



app.listen(SERVER_PORT, () => {
 console.log('Server Up and already running in Port ' + SERVER_PORT);
 console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});