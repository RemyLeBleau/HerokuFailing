const mongoose = require('mongoose');
const Schema = mongoose.Schema
// could also desctructure to const { Schema } = mongoose;
//The schema will describe what each collection is going to look like

const userSchema = new Schema ({
  googleID: String
});


//create a new collection called users baased off the parameters of userSchema
mongoose.model('users', userSchema)
