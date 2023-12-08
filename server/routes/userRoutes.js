const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { authController } = require("../controllers/userControllers");
const {
  loginController,
  registerController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
} = require("../controllers/userControllers");

const routerUser = express.Router();

routerUser.post("/login", loginController);

routerUser.post("/register", registerController);

routerUser.post("/getUserData", authMiddleware, authController);

routerUser.post("/marcar-consulta", authMiddleware, applyDoctorController);

routerUser.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

routerUser.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
routerUser.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

module.exports = routerUser;
