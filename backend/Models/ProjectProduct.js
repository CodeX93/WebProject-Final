const mongoose = require("mongoose");
const ProjectProductSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      unique: true,
      require: true,
    },
    Description: {
      type: String,
    },
    Email: {
      type: String,
      unique: true,
      require: true,
    },
    City: {
      type: String,
      require: true,
    },
    State: {
      type: String,
      require: true,
    },
    Country: {
      type: String,
      require: true,
    },
    Price: {
      type: Number,
      require: true,
    },

    file: {
      type: [String],
    },
  },
  { timestamps: true }
);
const ProjectProduct = mongoose.model("ProjectProduct", ProjectProductSchema);
module.exports = ProjectProduct;
