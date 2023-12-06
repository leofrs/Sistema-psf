const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllDoctorsController,
  applyDoctorController,
} = require("../controllers/medicosControllers");

const routerMedico = express.Router();

routerMedico.post("/apply-medico", authMiddleware, applyDoctorController);
routerMedico.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

module.exports = routerMedico;
