const mongoose = require("mongoose");

const chargerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    }
  },
  powerOutput: {
    type: Number,
    required: true,
  },
  connectorType: {
    type: String,
    enum: ["Type1", "Type2", "CCS", "CHAdeMO"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  }
}, { timestamps: true });

module.exports= mongoose.model("Charger", chargerSchema);
