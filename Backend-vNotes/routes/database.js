const mongoose = require('mongoose') ;
mongoose.connect("mongodb://127.0.0.1:27017/vNotes")

const example = mongoose.Schema({
  name : String
})

module.exports = mongoose.model("Db",example);