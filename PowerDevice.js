const mongoose = require('mongoose');

const PowerDeviceSchema = new mongoose.Schema({
  name: String,
  currentConsumption: Number,
  status: String,
  optimizationLevel: Number
});

module.exports = mongoose.model('PowerDevice', PowerDeviceSchema);