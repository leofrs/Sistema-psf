const doctorModel = require("../models/doctorModels.js");
const userModel = require("../models/userModels.js");

const getAllUserController = async (req, res) => {
  try {
    console.log("ola mundo");
    const resUsers = await userModel.find({});

    if (!resUsers || resUsers.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Nenhum usuário encontrado",
      });
    }

    res.status(200).send({
      success: true,
      message: "Dados dos usuários",
      data: resUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Erro ao buscar os usuários",
      error: error.message,
    });
  }
};

const getAllDoctorController = async (req, res) => {
  try {
    const resDoctor = await doctorModel.find({});
    res.status(200).send({
      succes: true,
      message: "doctor data",
      data: resDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error ao buscar o médico",
      error,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status, specialization } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notifcation;
    notification.push({
      type: "doctor-account-request-update",
      message: `Sua consulta com o medico ${specialization} foi ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "aprroved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro encontrado ao buscar o status da conta",
      error,
    });
  }
};

module.exports = {
  getAllDoctorController,
  getAllUserController,
  changeAccountStatusController,
};
