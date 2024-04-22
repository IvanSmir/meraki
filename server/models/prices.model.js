const mongoose = require("mongoose");

const PricesSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: [true, "Client ID is required"],
    },
    productId: {
      type: String,
      required: [true, "Product ID is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    state: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports.PricesModel = mongoose.model("Prices", PricesSchema);
