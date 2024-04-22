const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Name must be at least 5 characters long"],
    },
    precio: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar",
    },
    images: {
      type: Array,
    },
    materiales: {
      type: String,
      required: [true, "Materials is required"],
      minlength: [5, "Materials must be at least 5 characters long"],
    },
    tallas: {
      type: Object,
      required: [true, "Tallas is required"],
    },
    ajuste: {
      type: String,
      required: [true, "Ajuste is required"],
    },
    cuidados: {
      type: String,
      required: [true, "Cuidado is required"],
    },
    medidas: {
      type: String,
      required: [true, "Medidas is required"],
    },
  },
  { timestamps: true }
);

module.exports.ProductModel = mongoose.model("Product", ProductSchema);
