const express = require("express");
const ProductController = require("../controllers/products.controller");
const { upload } = require("../configs/multer.config");
const { authenticate } = require("../configs/jwt.config");

const productRouter = express.Router();

productRouter.post(
  "/add",
  authenticate,
  upload.array("images", 5),
  ProductController.addProduct
);
productRouter.get("/all", ProductController.getAllProducts);
productRouter.get("/top", ProductController.getTopThree);
productRouter.get("/:id", ProductController.getProduct);
productRouter.put("/:id", authenticate, ProductController.updateProduct);
productRouter.delete("/:id", authenticate, ProductController.deleteProduct);

module.exports = productRouter;
