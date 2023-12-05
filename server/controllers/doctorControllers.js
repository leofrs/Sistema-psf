const doctorModel = require("../models/doctorModels");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Requisição dos dados do médico doi realizada com sucesso",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      error,
      message: "Um erro foi encontrado ao fazer a busca de dados dos médicos",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Consulta médica encontrada com sucesso",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      error,
      message: "Erro encontrado ao buscar a consulta com o médico",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
};
