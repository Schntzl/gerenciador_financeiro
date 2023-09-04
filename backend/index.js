const express = require("express");

const app = express();

app.use(express.json());

app.listen(666, () => console.log("Hades."));

const mysql = require("mysql2/promise");
const conection = mysql.createPool({
  host: "localhost",
  port: 3306,
  databese: "testepessoa",
  user: "root",
  password: "",
});

const getAllPessoas = async () => {
  const [query] = await conection.execute("select * from pessoa");
  return query;
};

app.get("/pessoa", async (req, res) => {
  const resultado = await getAllPessoas();
  return res.status(200).json(resultado);
});
