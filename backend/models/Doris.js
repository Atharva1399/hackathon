const mongoose = require('mongoose');

const dorisSchema = new mongoose.Schema({
    owner_name: String,
    propertyid: String,
    district: String,
    taluka: String,
    village: String,
    registration_number: String
});

module.exports = mongoose.model('Doris', dorisSchema);
