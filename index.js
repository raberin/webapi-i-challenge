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

//Gets a specific user
server.get("/api/users/:id", (req, res) => {
  //Acquire the specific persons id
  const { id } = req.params;

  users
    .findById(id)
    .then(user => {
      //If the user.id is present, return user
      if (user) {
        res.json(user);
      } else {
        //If the id is not found in the user return err
        res.status(404).json({
          error: "The user with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The user unformation could not be retrieved"
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(removedUser => {
      if (removedUser) {
        res.json({
          success: `The user with ID: ${id} has been removed`
        });
      } else {
        res.status.apply(404).json({
          error: "The user with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The user unformation could not be retrieved"
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  //Pulling out the ID key value
  const { id } = req.params;
  const { name, bio } = req.body;

  users
    .update(id, { name, bio })
    .then(updatedUser => {
      if (!name || !bio) {
        res.status(400).json({
          error: "Please provide name and bio for the user."
        });
      } else if (!id) {
        res.status(404).json({
          error: "The user with the specified ID does not exist"
        });
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The user unformation could not be retrieved"
      });
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
