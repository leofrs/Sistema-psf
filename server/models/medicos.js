const mongoose = require("mongoose");

const medicosSchema = new mongoose.Schema(
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
    cfm: {
      type: String,
      required: [true, "CFM é obrigatorio"],
    },
    specialization: {
      type: String,
      required: [true, "Especialização é obrigatorio"],
    },
    timming: {
      type: Object,
      required: [false, "Tempo por consulta é obrigatorio"],
    },
  },
  { timestamps: true }
);

const medicoModel = mongoose.model("medicos", medicosSchema);

module.exports = medicoModel;
