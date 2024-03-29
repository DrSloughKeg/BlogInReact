const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const artRouter = require("./routes/Articles");
app.use("/articles", artRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const commRouter = require("./routes/Comments");
app.use("/comments", commRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
