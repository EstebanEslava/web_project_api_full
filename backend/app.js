require("dotenv").config(); //se añadio recien
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");

const user = require("./models/users");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { UserCreate, login } = require("./controllers/users");
const {
  validateUserSignup,
  validateUserSignin,
} = require("./middlewares/validation");

const path = require("path");

const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/aroundb" } =
  process.env;

const userPath = path.join(__dirname, "data/users.json");
const cardsPath = path.join(__dirname, "data/cards.json");

app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Conectado a MongoDB en la base de datos 'aroundb'"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send({ message: "Bienvenido a la API" });
});

app.post("/signin", validateUserSignin, login);
app.post("/signup", validateUserSignup, UserCreate);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.code === 11000) {
    return res.status(409).send({ message: "El correo ya esta registrado" });
  }

  if (err.name === "ValidationError") {
    res
      .status(400)
      .send({ message: "Error al crear usuario", error: err.message });
  }

  console.error("Error al crear usuario:", err);
  return res.status(500).send({ message: "Error en el servidor" });
});

app.listen(PORT, () => {
  console.log(`La aplicación está detectando el puerto ${PORT}`);
});
