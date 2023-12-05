const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
} = require("../controllers/doctorControllers.js");

const routerDoctor = express.Router();

routerDoctor.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);
routerDoctor.post("/updateProfile", authMiddleware, updateProfileController);
routerDoctor.post("/getDoctorById", authMiddleware, getDoctorByIdController);

module.exports = routerDoctor;
