const express = require("express");
const router = express.Router();
const User = require("../models/User");

// get all users
router.get("/", (req, res) => {
  User.find({})
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({message: "Profile not found"})
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router