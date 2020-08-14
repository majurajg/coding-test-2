const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const petSchema = new mongoose.Schema (
  {
  id:{type:Number,required:true},
  name: {type:String,required:true},
  colour:{type:String,required:true},
  age:{type:Number,required:true},
});

module.exports = mongoose.model('Pets', petSchema);