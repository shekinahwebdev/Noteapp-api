const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/list/:userId", async function (req, res) {
  var note = await Note.find({ userId: req.params.userId });
  res.json(note);
  // res.send("This is the Note page");
});

router.post("/add", async function (req, res) {
  const newNote = new Note({
    id: req.body.id,
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
  });

  await newNote.save();

  const response = {
    message: `New Note created with id: ${req.body.id}`,
  };

  res.json(response);
});

router.put("/update", async function (req, res) {
  var updateNotes = await Note.findOneAndUpdate(
    { id: req.body.id },
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true },
  );

  const response = {
    message: `Note had been updated with id: ${req.body.id}`,
    note: updateNotes,
  };

  res.json(response);
});

router.delete("/delete", async function (req, res) {
  var deleteNotes = await Note.deleteOne({ id: req.body.id });

  var response = {
    message: `Note has been deleted with id: ${req.body.id}`,
    note: deleteNotes,
  };
  res.json(response);
});

module.exports = router;
