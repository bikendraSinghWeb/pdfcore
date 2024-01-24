
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const dbConnect = require('./config/dbConnect')
const UserRoute = require('./Routes/userRoutes')
const dotenv = require('dotenv');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
dotenv.config();
dbConnect();
app.use(express.json());
app.use(cors());
app.use('/',UserRoute);

app.listen(process.env.PORT, () => {
    console.log("Server on");
});


