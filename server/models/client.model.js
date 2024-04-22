const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const MedidasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Medida is required"],
    minlength: [3, "Medida must be at least 3 characters long"],
  },
  valor: {
    type: String,
    required: [true, "Valor is required"],
    min: [0, "Valor must be at least 0"],
  },
});

const ClientSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Name must be at least 5 characters long"],
    },
    telefono: {
      type: String,
      required: [true, "Phone is required"],
      minlength: [8, "Phone must be at least 8 characters long"],
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar",
    },
    medidas: {
      type: Array,
      of: MedidasSchema,
    },
  },
  { timestamps: true }
);

ClientSchema.plugin(uniqueValidator, { message: "Number is already in use" });

module.exports.ClientModel = mongoose.model("Client", ClientSchema);
