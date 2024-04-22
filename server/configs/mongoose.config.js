const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Estas conectado a la base de datos"))
  .catch((err) => console.log(err));
