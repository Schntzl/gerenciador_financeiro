const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.listen(666, () => console.log("Hades."));

const mysql = require("mysql2/promise");
const conection = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "testepessoa",
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

app.get("/pessoa/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await conection.execute("select * from pessoa where id = ?", [
    id,
  ]);
  if (query.legth === 0)
    return res.status(400).json({ mensagem: "nenhuma pessoa encontrada" });
  return res.status(200).json(query);
});

app.get("/pessoa/buscar:nome", async (req, res) => {
  const { nome } = req.params;
  const [query] = await conection.execute(
    "SELECT * FROM testepessoa.pessoa where nome like ?",
    ["%" + nome + "%"]
  );
  if (query.legth === 0)
    return res.status(400).json({ mensagem: "nenhuma pessoa encontrada" });
  return res.status(200).json(query);
});

app.get("/pessoa/buscar:email", async (req, res) => {
  const { email } = req.params;
  const [query] = await conection.execute(
    "SELECT * FROM testepessoa.pessoa where email like ?",
    ["%" + email + "%"]
  );
  if (query.legth === 0)
    return res.status(400).json({ mensagem: "nenhuma pessoa encontrada" });
  return res.status(200).json(query);
});

app.post("/pessoa", async (req, res) => {
  const { nome, email } = req.body;
  const [query] = await conection.execute(
    "insert into pessoa (nome, email) values (?, ?)",
    [nome, email]
  );
  return res.log(nome);
});

app.put("/pessoa/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  const [query] = await conection.execute(
    "update pessoa set nome = ?, email = ? where id = ?",
    [nome, email, id]
  );
  return res.json(query);
});

app.delete("/pessoa/:id", async (req, res) => {
  const { id } = req.params;

  const [query] = await conection.execute("delete from pessoa where id = ?", [
    id,
  ]);
  return res.json(query);
});
