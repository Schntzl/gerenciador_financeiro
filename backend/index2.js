const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(666, () => console.log("App."));

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "EJRMoney",
  user: "root",
  password: "",
});

app.post("/receitas", async (req, res) => {
  try {
    const { descricao, valor, data, categoria_receita_id } = req.body;
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
      "INSERT INTO receitas (descricao, valor, data, categoria_receita_id) VALUES (?, ?, ?, ?)",
      [descricao, valor, data, categoria_receita_id]
    );
    connection.release();
    res.send("Receita adicionada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar receita.");
  }
});

app.post("/despesas", async (req, res) => {
  try {
    const { descricao, valor, data, categoria_despesa_id } = req.body;
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
      "INSERT INTO despesas (descricao, valor, data, categoria_despesa_id) VALUES (?, ?, ?, ?)",
      [descricao, valor, data, categoria_despesa_id]
    );
    connection.release();
    res.send("Despesa adicionada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar despesa.");
  }
});

app.get("/receitas", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute("SELECT * FROM receitas");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar receitas.");
  }
});

app.get("/despesas", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute("SELECT * FROM despesas");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar despesas.");
  }
});

const port = 666;
app.listen(port, () =>
  console.log(`Servidor rodando na porta ${port}. Hades.`)
);
