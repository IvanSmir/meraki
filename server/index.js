const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv").config();

app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "http://192.168.100.204:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./configs/mongoose.config");

const userRoutes = require("./routes/user.route");
app.use("/api/auth", userRoutes);

const clientRoutes = require("./routes/client.route");
app.use("/api/clients", clientRoutes);

const productRoutes = require("./routes/products.route");
app.use("/api/products", productRoutes);

const priceRoutes = require("./routes/prices.route");
app.use("/api/prices", priceRoutes);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "192.168.100.204";

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
