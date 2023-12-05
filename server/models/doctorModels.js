const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "Nome é obrigatorio"],
    },
    lastName: {
      type: String,
      required: [true, "Sobrenome é obrigatorio"],
    },
    phone: {
      type: String,
      required: [true, "Telefone é obrigatorio"],
    },
    email: {
      type: String,
      required: [true, "email é obrigatorio"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Endereço é obrigatorio"],
    },
    specialization: {
      type: String,
      required: [true, "Especialização é obrigatorio"],
    },
    experience: {
      type: String,
      required: [true, "Experiencia é obrigatorio"],
    },
    pricePerConsultation: {
      type: Number,
      required: [true, "Preço por consulta é obrigatorio"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timming: {
      type: Object,
      required: [false, "Tempo por consulta é obrigatorio"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
