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
    const { userId } = req; // Certifique-se de que o ID do usuário está disponível

    // Crie uma nova instância do médico e associe ao usuário
    const newDoctor = new medicosModel({ ...req.body, userId });
    await newDoctor.save();

    res.status(201).send({
      success: true,
      message: "Médico cadastrado com sucesso",
      data: newDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro ao cadastrar médico",
    });
  }
};

module.exports = {
  getAllDoctorsController,
  applyDoctorController,
};
