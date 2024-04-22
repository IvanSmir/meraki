const express = require("express");
const ClientController = require("../controllers/client.controller");
const { upload } = require("../configs/multer.config");
const { authenticate } = require("../configs/jwt.config");

const clientRouter = express.Router();

clientRouter.post(
  "/add",
  authenticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  ClientController.addClient
);
clientRouter.get("/all", authenticate, ClientController.getAllClients);
clientRouter.get("/:id", authenticate, ClientController.getClient);
clientRouter.put("/:id", authenticate, ClientController.updateClient);
clientRouter.delete("/:id", authenticate, ClientController.deleteClient);

module.exports = clientRouter;
