const { ClientModel } = require("../models/client.model");
const mongoose = require("mongoose");
const uploadFile = require("../utils/uploadFile");

module.exports = {
  addClient: async (req, res) => {
    try {
      const body = req.body;
      const image = req.files?.image || null;
      let downloadUrl = "https://www.gravatar.com/avatar";
      if (image && image?.length > 0) {
        const imagex = await uploadFile.uploadFile(image[0]);
        downloadUrl = imagex.downloadUrl;
      }
      const client = await new ClientModel({
        ...body,
        avatar: image ? downloadUrl : "https://www.gravatar.com/avatar",
      });
      const newClient = await client.save();
      res.status(201);
      res.json({
        message: "New client created",
      });
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        console.log(err.errors);
        if (err.errors.telefono) {
          res.status(409);
          res.json({
            error: err.errors.telefono.properties.message,
          });
        } else if (err.errors.nombre) {
          res.status(400);
          res.json({
            error: err.errors.name.properties.message,
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
  getAllClients: async (req, res) => {
    try {
      const clients = await ClientModel.find();
      res.json(clients);
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  getClient: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        res.json({ message: "Invalid ID" });
        return;
      }
      const client = await ClientModel.findById(req.params.id);
      if (client === null) {
        res.status(404);
        res.json({ message: "Client not found" });
      } else {
        res.json(client);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: "Server error" });
    }
  },
  updateClient: async (req, res) => {
    try {
      const client = await ClientModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (client === null) {
        res.status(404);
        res.json({
          message: "Client not found",
        });
      }
      res.json({
        message: "Client updated",
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        message: "Server error",
      });
    }
  },
  deleteClient: async (req, res) => {
    try {
      const client = await ClientModel.findByIdAndDelete(req.params.id);
      if (client === null) {
        res.status(404);
        res.json({
          message: "Client not found",
        });
      }
      res.json({
        message: "Client deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        message: "Server error",
      });
    }
  },
};
