const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/Authmiddleware");

router.get("/:artId", async (req, res) => {
  const artId = req.params.artId;
  const comments = await Comments.findAll({ where: { ArticleId: artId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comments = req.body;
  const userId = req.userToken.id;
  comments.UserId = userId;
  await Comments.create(comments);
  res.json(comments);
});

module.exports = router;
