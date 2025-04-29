const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner_name: String,
  propertyid: String,
  district: String,
  taluka: String,
  village: String,
  registration_number: String,

  doris: Object,
  dlr: Object,
  cersai: Object,
  mca21: Object,
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
