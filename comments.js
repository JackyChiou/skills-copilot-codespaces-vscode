// Create web server to handle comments
// =============================================================
var express = require("express");
var router = express.Router();
var Comment = require("../models/comment.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  Comment.selectAll(function(data) {
    var hbsObject = {
      comments: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/comments", function(req, res) {
  Comment.insertOne([
    "comment", "author", "date"
  ], [
    req.body.comment, req.body.author, req.body.date
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/comments/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  Comment.updateOne({
    comment: req.body.comment,

