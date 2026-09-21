const express = require("express");

const PORT = 3000;

const bodyParser = require("body-parser");

const path = require("path");

const app = express();

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const sequelize = require("./util/db");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);

app.use("/admin", adminRoutes.routes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
    console.log(`Listening: http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });

