const { PricesModel } = require("../models/prices.model");
const { ProductModel } = require("../models/products.model");
const { ClientModel } = require("../models/client.model");
const mongoose = require("mongoose");

module.exports = {
  addPrice: async (req, res) => {
    try {
      const body = req.body;
      const price = await new PricesModel(body);
      const newPrice = await price.save();
      res.status(201);
      res.json({
        message: "New price created",
      });
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        console.log(err.errors);
        if (err.errors.clientId) {
          res.status(400);
          res.json({
            error: err.errors.clientId.properties.message,
          });
        } else if (err.errors.productId) {
          res.status(400);
          res.json({
            error: err.errors.productId.properties.message,
          });
        } else if (err.errors.price) {
          res.status(400);
          res.json({
            error: err.errors.price.properties.message,
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
  getAllPrices: async (req, res) => {
    try {
      const prices = await PricesModel.find();
      res.json(prices);
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  getProductPrices: async (req, res) => {
    try {
      const { productId } = req.params;
      const prices = await PricesModel.find({ productId });
      res.json(prices);
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  getClientPrices: async (req, res) => {
    try {
      const { clientId } = req.params;
      const prices = await PricesModel.find({ clientId });
      const ClientProductPrices = await Promise.all(
        prices.map(async (price) => {
          const product = await ProductModel.findById(price.productId);
         
          return {
            ...price.toObject(),
            nombre: product?.nombre,
            imagen: product?.avatar,
          };
        })
      );
      res.json(ClientProductPrices);
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  getClientPricesByNumber: async (req, res) => {
    try {
      const { clientNumber } = req.params;
      const client = await ClientModel.findOne({ telefono: clientNumber });
      if (client === null) {
        res.status(404);
        res.json({
          message: "Client not found",
        });
        return;
      }
      const prices = await PricesModel.find({ clientId: client._id });
      const ClientProductPrices = await Promise.all(
        prices.map(async (price) => {
          const product = await ProductModel.findById(price.productId);
          return {
            ...price.toObject(),
            nombre: product?.nombre,
            imagen: product?.avatar,
          };
        })
      );
      res.json(ClientProductPrices);
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  updatePrice: async (req, res) => {
    try {
      const price = await PricesModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (price === null) {
        res.status(404);
        res.json({
          message: "Price not found",
        });
      }
      res.json({
        message: "Price updated",
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  deletePrice: async (req, res) => {
    try {
      const price = await PricesModel.findByIdAndDelete(req.params.id);
      if (price === null) {
        res.status(404);
        res.json({
          message: "Price not found",
        });
      }
      res.json({
        message: "Price deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
};
