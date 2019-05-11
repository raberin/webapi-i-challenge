// implement your API here
//Import Express
const express = require("express");

//Importing
const db = require("./data/db.js");
const users = db;

const server = express();

server.use(express.json());

//Endpoints

//Grabs all users and returns an arr
server.get("/api/users", (req, res) => {
  users
    .find()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//Post a user into db
server.post("/api/users", (req, res) => {
  //newUser is set to the receiving data from client
  const newUser = req.body;

  users
    .insert(newUser)
    .then(addedUser => {
      if (!newUser.name || !newUser.bio) {
        res.status(400).json({
          error: "Please provide name and bio for the user"
        });
      }
      res.status(201).json(addedUser);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

//Listening
server.listen(5000, () => {
  console.log("Listening on port 5000");
});
