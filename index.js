const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/dbConnect');
const UserRoute = require('./Routes/userRoutes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

dbConnect();
app.use(express.json());
app.use(cors());
app.use('/', UserRoute);

app.listen(process.env.PORT, () => {
  console.log('Server on');
});
