const { ProductModel } = require("../models/products.model");
const mongoose = require("mongoose");
const uploadFile = require("../utils/uploadFile");
const { PricesModel } = require("../models/prices.model");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const body = req.body;

      const images = req.files;
      console.log(images);
      const downloadUrls = [];
      for (const image of images) {
        const imagex = await uploadFile.uploadFile(image);
        downloadUrls.push(imagex.downloadUrl);
      }
      const product = await new ProductModel({
        ...body,
        nombre: body.titulo,
        avatar: downloadUrls[0],
        images: downloadUrls,
      });
      const newProduct = await product.save();
      res.status(201);
      res.json({
        message: "New product created",
      });
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        console.log(err.errors);
        if (err.errors.name) {
          res.status(409);
          res.json({
            error: err.errors.name.properties.message,
          });
        } else if (err.errors.price) {
          res.status(400);
          res.json({
            error: err.errors.price.properties.message,
          });
        } else if (err.errors.description) {
          res.status(400);
          res.json({
            error: err.errors.description.properties.message,
          });
        } else if (err.errors.materials) {
          res.status(400);
          res.json({
            error: err.errors.materials.properties.message,
          });
        } else if (err.errors.tallas) {
          res.status(400);
          res.json({
            error: err.errors.tallas.properties.message,
          });
        } else if (err.errors.ajuste) {
          res.status(400);
          res.json({
            error: err.errors.ajuste.properties.message,
          });
        } else if (err.errors.cuidado) {
          res.status(400);
          res.json({
            error: err.errors.cuidado.properties.message,
          });
        } else {
          res.status(500);
          res.json({ message: "Server error" });
        }
      } else {
        res.status(500);
        res.json({ message: "Server error" });
      }
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const search = req.query.search;

      let filter = {};
      if (search) {
        filter.nombre = { $regex: search, $options: "i" };
      }

      const products = await ProductModel.find(filter);
      res.json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getProduct: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        res.json({ message: "Invalid ID" });
        return;
      }
      const product = await ProductModel.findById(req.params.id);
      if (product === null) {
        res.status(404);
        res.json({ message: "Product not found" });
      } else {
        res.json(product);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const body = req.body;
      console.log(body);
      const product = await ProductModel.findByIdAndUpdate(req.params.id, body);
      if (product === null) {
        res.status(404);
        res.json({
          message: "Product not found",
        });
      }
      res.json({
        message: "Product updated",
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await ProductModel.findByIdAndDelete(req.params.id);
      await PricesModel.deleteMany({ productId: req.params.id });
      if (product === null) {
        res.status(404);
        res.json({
          message: "Product not found",
        });
      }
      res.json({
        message: "Product deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  getTopThree: async (req, res) => {
    try {
      const products = await ProductModel.find()
        .sort({ createdAt: -1 })
        .limit(3);
      res.json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};
