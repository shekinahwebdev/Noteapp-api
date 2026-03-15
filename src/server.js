const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://patriciashilohkanneh12_db_user:StK5rng3M4jXjydT@cluster0.a3tlxmu.mongodb.net/notesdb",
  )
  .then(function (req, res) {
    app.get("/", function (req, res) {
      res.json({
        message: "API is working",
      });
      res.send("This is the Home page");
    });

    const noteRouter = require("./routes/Note");
    app.use("/notes", noteRouter);
  });

const PORT = process.env.PORT || 8000;

app.listen("8000", () => {
  console.log(`Server running at port: ${PORT}`);
});
