const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  getAllUserController,
  getAllDoctorController,
  changeAccountStatusController,
} = require("../controllers/adminControllers.js");

const routerAdmin = express.Router();

routerAdmin.get("/getUsers", authMiddleware, getAllUserController);
routerAdmin.get("/getDoctors", authMiddleware, getAllDoctorController);
routerAdmin.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);
module.exports = routerAdmin;
