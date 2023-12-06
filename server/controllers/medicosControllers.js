const medicosModel = require("../models/medicos");
const userModel = require("../models/userModels");

const getAllDoctorsController = async (req, res) => {
  try {
    const { userId } = req;
    const doctors = await medicosModel.find({ userId });
    res.status(200).send({
      success: true,
      message: "Requisição efetuada com sucesso",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error encontrado ao requisitar a lista de médicos",
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await medicosModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Sua solicitação doi efetuada com sucesso`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

module.exports = {
  getAllDoctorsController,
  applyDoctorController,
};
