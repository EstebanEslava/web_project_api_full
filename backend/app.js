const express = require("express");
const mongoose = require("mongoose");

const user = require("./models/users");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const path = require("path");

const app = express();

const { PORT = 3000 } = process.env;

const userPath = path.join(__dirname, "data/users.json");
const cardsPath = path.join(__dirname, "data/cards.json");

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB en la base de datos 'aroundb'"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.use((req, res, next) => {
  req.user = {
    _id: "68b275fb1355faf152ce4371",
  };

  next();
});

app.get("/", (req, res) => {
  res.send({ message: "Bienvenido a la API" });
});

app.use("/users", userRouter);

app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`La aplicación está detectando el puerto ${PORT}`);
});
