const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes.js"));
app.use("/api/doctor", require("./routes/doctorRoutes.js"));
app.use("/api/medicos", require("./routes/medicos.js"));

app.get("/api/admin", (rep, res) => {
  res.status(200).send("Servidor rodando da porta 8080 parte do adminRoutes");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`.bgGreen.black);
});
