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
      required: [false, "email não é obrigatorio"],
    },
    address: {
      type: String,
      required: [true, "Endereço é obrigatorio"],
    },
    specialization: {
      type: String,
      required: [true, "Especialização é obrigatorio"],
    },
    numberSUS: {
      type: Number,
      required: [true, "Número do cartão do SUS é obrigatorio"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("consultasMarcadas", doctorSchema);

module.exports = doctorModel;
