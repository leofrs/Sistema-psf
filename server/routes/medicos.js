const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllDoctorsController,
  applyDoctorController,
} = require("../controllers/medicosControllers");

const routerMedico = express.Router();

routerMedico.post("/register-doctor", authMiddleware, applyDoctorController);
routerMedico.get("/getDoctors", authMiddleware, getAllDoctorsController);

module.exports = routerMedico;
