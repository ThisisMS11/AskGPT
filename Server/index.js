const express = require("express");
const app = express();
const dotenv = require('dotenv')
const bodyParser = require("body-parser");
app.use(bodyParser.json());
dotenv.config();
const cai = require('./Routers/apiRouter')
app.use('/quistion', cai); 


// app.post("/chat");
app.listen(4000, () => console.log("listening on 4000"));
