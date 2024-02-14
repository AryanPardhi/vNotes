const Notes = require("../models/Notes");

// adding new notes
exports.addNotes = async (req, res, next) => {
    try {
      const notes = await new Notes({
        title: req.body.title,
        desc: req.body.desc,
        tag: req.body.tag,
        user: req.userData.userId,
      }).save();
      res.status(200).json({ notes: notes });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching notes",
        error: error.message,
      });
    }
  }

// fetching all notes
exports.fetchNotes =  async (req, res, next) => {
    try {
      const notes = await Notes.find({ user: req.userData.userId }); // Use req.userData.userId to fetch notes
      res.status(200).json(
       notes
      );
    } catch (error) {
      console.error("Error fetching notes:", error); // Log the error for debugging
      res.status(500).json({
        message: "An error occurred while fetching notes",
        error: error.message, // Return the error message in the response
      });
    }
  }

// updating exsisting notes
exports.updateNotes = async (req, res, next) => {
    try {
      const { title, desc, tag } = req.body; // Extract title, desc, and tag from req.body
  
      const newNote = {};
      if (title) newNote.title = title;
      if (desc) newNote.desc = desc;
      if (tag) newNote.tag = tag;
  
      let note = await Notes.findById(req.params.id); // Add await keyword here
  
      if (!note) {
        return res.status(404).json({
          message: "No Note Found",
        });
      }
  
      if (note.user.toString() !== req.userData.userId) {
        // Correct comparison here
        return res.status(401).json({ message: "Access Denied" });
      }
  
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      ); // Add await keyword here
      res.status(200).json({ note: note });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({
        message: "An error occurred while updating note",
        error: error.message,
      });
    }
  }

// deleting notes
exports.deleteNotes =  async (req, res, next) => {
    try {
      let note = await Notes.findById(req.params.id);
  
      if (!note) {
        return res.status(404).json({
          message: "No Note Found",
        });
      }
  
      if (note.user.toString() !== req.userData.userId) {
        // Correct comparison here
        return res.status(401).json({ message: "Access Denied" });
      }
  
      note = await Notes.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Success Deleted", note: note });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({
        message: "An error occurred while deleting note",
        error: error.message,
      });
    }
  }