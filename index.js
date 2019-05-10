// implement your API here
//Import Express
const express = require("express");

//Importing
const db = require("./data/db.js");
const users = db;

const server = express();

server.use(express.json());

//Listening
server.listen(5000, () => {
  console.log("Listening on port 5000");
});
