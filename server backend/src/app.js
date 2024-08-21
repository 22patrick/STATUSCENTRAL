import express from "express";
import router from "./routes.js";

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin: *");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// indicar para o express ler body com json
app.use(express.json());

// usar as rotas que estão no arquivo routes.js
app.use(router);

export default app;
