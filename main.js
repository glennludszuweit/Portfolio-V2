const express = require("express");

const app = express();
const port = process.env.PORT || 9000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("views/index");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
