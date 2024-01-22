const express = require("express");
const router = express.Router();
const { Articles } = require("../models");
const { validateToken } = require("../middleware/Authmiddleware");

router.get("/", async (req, res) => {
  const listOfArticles = await Articles.findAll({
    limit: 5,
    order: [["id", "DESC"]],
  });
  res.json(listOfArticles);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const art = await Articles.findByPk(id); //try catch, 500
  //if no art, 404
  res.json(art);
});

router.post("/", validateToken, async (req, res) => {
  const art = req.body;
  const userId = req.userToken.id;
  art.UserId = userId;
  await Articles.create(art); //try catch err 500
  res.json(art); //res.json(true)
});

module.exports = router;
