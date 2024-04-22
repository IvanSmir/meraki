const express = require("express");
const PricesController = require("../controllers/prices.controller");
const { authenticate } = require("../configs/jwt.config");

const pricesRouter = express.Router();

pricesRouter.post("/add", authenticate, PricesController.addPrice);
pricesRouter.get("/all", authenticate, PricesController.getAllPrices);
pricesRouter.get(
  "/:productId",
  authenticate,
  PricesController.getProductPrices
);
pricesRouter.put("/:id", authenticate, PricesController.updatePrice);
pricesRouter.get(
  "/client/:clientId",
  authenticate,
  PricesController.getClientPrices
);
pricesRouter.get(
  "/client/number/:clientNumber",
  PricesController.getClientPricesByNumber
);

pricesRouter.delete("/:id", authenticate, PricesController.deletePrice);

module.exports = pricesRouter;
