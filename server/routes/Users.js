const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/Authmiddleware");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  //add try catach
  if (!user) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email: email,
        password: hash,
      });
      res.json("Success");
    });
  } else {
    res.json({ error: "User already exists" }); // 409
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } }); //try catch

  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Password does not match." });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "secure" //ovB5\&}wXe}7>^5{Jze.pt7#olQu+nVde9h[(hUQd+HFzx$\V'
        );
        res.json(accessToken);
      }
    });
  } else {
    res.json({ error: "User does not exist" }); //400
  }
});

router.get("/", validateToken, (req, res) => {
  res.json(res.user);
});

module.exports = router;
