var express = require("express");
var router = express.Router();
const checkAuth = require("../middleware/check-auth");
const NotesController = require('../controllers/note')

// get all the notes display * login required
router.get("/fetchallnotes", checkAuth, NotesController.fetchNotes);

// adding notes * login required
router.post("/addnotes", checkAuth, NotesController.addNotes );

// updating notes * login required
router.put("/updatenotes/:id", checkAuth, NotesController.updateNotes);

// deleting notes * login required
router.delete("/deletenotes/:id", checkAuth,NotesController.deleteNotes);

module.exports = router;
