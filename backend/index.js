const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const PORT = 791;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const mysql = require("mysql2/promise");
const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "EJRMoney",
  user: "root",
  password: "",
});

app.post("/salvar/usuario", async (req, res) => {
  const { nome, email, senha } = req.body;
  const [query] = await connection.execute(
    "insert into usuario (nome, email, senha) values (?, ?, ?)",
    [nome, email, senha]
  );
  return res.json(query);
});

app.post("/salvar/categoria/receita", async (req, res) => {
  const { nome, tipo } = req.body;
  const [query] = await connection.execute(
    "insert into categoria_receita (nome, tipo) values (?, ?)",
    [nome, tipo]
  );
  return res.json(query);
});

app.post("/salvar/categoria/despesa", async (req, res) => {
  const { nome, tipo } = req.body;
  const [query] = await connection.execute(
    "insert into categoria_despesa (nome, tipo) values (?, ?)",
    [nome, tipo]
  );
  return res.json(query);
});

app.post("/salvar/despesa", async (req, res) => {
  const { descricao, valor, data, categoria_despesa_id } = req.body;
  const [query] = await connection.execute(
    "insert into despesas (descricao, valor, data, categoria_despesa_id) values (?, ?, ?, ?)",
    [descricao, valor, data, categoria_despesa_id]
  );
  return res.json(query);
});

app.post("/salvar/receita", async (req, res) => {
  const { descricao, valor, data, categoria_despesa_id } = req.body;
  const [query] = await connection.execute(
    "insert into receitas (descricao, valor, data, categoria_receita_id) values (?, ?, ?, ?)",
    [descricao, valor, data, categoria_despesa_id]
  );
  return res.json(query);
});

const getAllUsuarios = async () => {
  const [query] = await connection.execute("select * from usuario");
  return query;
};

const getAllCategoriaReceitas = async () => {
  const [query] = await connection.execute("select * from categoria_receita");
  return query;
};

const getAllCategoriaDespesas = async () => {
  const [query] = await connection.execute("select * from categoria_despesa");
  return query;
};

const getAllReceitas = async () => {
  const [query] = await connection.execute("select * from receitas");
  return query;
};

const getAllDespesas = async () => {
  const [query] = await connection.execute("select * from despesas");
  return query;
};

app.get("/usuario", async (req, res) => {
  const resultado = await getAllUsuarios();
  return res.status(200).json(resultado);
});

app.get("/categoria/receita", async (req, res) => {
  const resultado = await getAllCategoriaReceitas();
  return res.status(200).json(resultado);
});

app.get("/categoria/despesa", async (req, res) => {
  const resultado = await getAllCategoriaDespesas();
  return res.status(200).json(resultado);
});

app.get("/despesas", async (req, res) => {
  const resultado = await getAllDespesas();
  return res.status(200).json(resultado);
});

app.get("/receitas", async (req, res) => {
  const resultado = await getAllReceitas();
  return res.status(200).json(resultado);
});

app.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "select * from usuario where id = ?",
    [id]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhum usuario encontrado" });
  return res.status(200).json(query);
});

app.get("/categoria/receita/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "select * from categoria_receita where id = ?",
    [id]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.get("/categoria/despesa/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "select * from categoria_despesa where id = ?",
    [id]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.get("/receitas/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "select * from receitas where id = ?",
    [id]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.get("/despesas/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "select * from despesas where id = ?",
    [id]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma despesa encontrada" });
  return res.status(200).json(query);
});

app.get("/usuario/buscarnome/:nome", async (req, res) => {
  const { nome } = req.params;
  const [query] = await connection.execute(
    "select * from usuario where nome like ?",
    ["%" + nome + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhum usuario encontrado" });
  return res.status(200).json(query);
});

app.get("/usuario/buscaremail/:email", async (req, res) => {
  const { email } = req.params;
  const [query] = await connection.execute(
    "select * from usuario where email like ?",
    ["%" + email + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhum usuario encontrado" });
  return res.status(200).json(query);
});

app.get("/categoria/receita/buscarnome/:nome", async (req, res) => {
  const { nome } = req.params;
  const [query] = await connection.execute(
    "select * from categoria_receita where nome like ?",
    ["%" + nome + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.get("/categoria/receita/buscartipo/:tipo", async (req, res) => {
  const { tipo } = req.params;
  const [query] = await connection.execute(
    "select * from categoria_receita where tipo like ?",
    ["%" + tipo + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.get("/categoria/despesa/buscarnome/:nome", async (req, res) => {
  const { nome } = req.params;
  const [query] = await connection.execute(
    "select * from categoria_despesa where nome like ?",
    ["%" + nome + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma despesa encontrada" });
  return res.status(200).json(query);
});

app.get("/categoria/despesa/buscartipo/:tipo", async (req, res) => {
  const { tipo } = req.params;
  const [query] = await connection.execute(
    "select * from categoria_despesa where tipo like ?",
    ["%" + tipo + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma despesa encontrada" });
  return res.status(200).json(query);
});

app.get("/despesas/buscardescricao/:descricao", async (req, res) => {
  const { descricao } = req.params;
  const [query] = await connection.execute(
    "select * from despesas where descricao like ?",
    ["%" + descricao + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma despesa encontrada" });
  return res.status(200).json(query);
});

app.get("/despesas/buscardata/:data", async (req, res) => {
  const { data } = req.params;
  const [query] = await connection.execute(
    "select * from despesas where data like ?",
    ["%" + data + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma despesa encontrada" });
  return res.status(200).json(query);
});

app.get("/despesas/buscarcategoria/:categoria", async (req, res) => {
  const { categoria } = req.params;
  const [query] = await connection.execute(
    "select * from despesas where categoria_despesa_id like ?",
    ["%" + categoria + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma despesa encontrada" });
  return res.status(200).json(query);
});

app.get("/receitas/buscardescricao/:descricao", async (req, res) => {
  const { descricao } = req.params;
  const [query] = await connection.execute(
    "select * from receitas where descricao like ?",
    ["%" + descricao + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.get("/receitas/buscardata/:data", async (req, res) => {
  const { data } = req.params;
  const [query] = await connection.execute(
    "select * from receitas where data like ?",
    ["%" + data + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.get("/receita/buscarcategoria/:categoria", async (req, res) => {
  const { categoria } = req.params;
  const [query] = await connection.execute(
    "select * from receitas where categoria_receita_id like ?",
    ["%" + categoria + "%"]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhuma receita encontrada" });
  return res.status(200).json(query);
});

app.put("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const [query] = await connection.execute(
    "update usuario set nome = ?, email = ?, senha = ? where id = ?",
    [nome, email, senha, id]
  );
  return res.json(query);
});

app.put("/categoria/receita/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, tipo } = req.body;

  const [query] = await connection.execute(
    "update categoria_receita set nome = ?, tipo = ? where id = ?",
    [nome, tipo, id]
  );
  return res.json(query);
});

app.put("/categoria/despesa/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, tipo } = req.body;

  const [query] = await connection.execute(
    "update categoria_despesa set nome = ?, tipo = ? where id = ?",
    [nome, tipo, id]
  );
  return res.json(query);
});

app.put("/despesas/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_despesa_id } = req.body;

  const [query] = await connection.execute(
    "update despesas set descricao = ?, valor = ?, data = ?, categoria_despesa_id = ? where id = ?",
    [descricao, valor, data, categoria_despesa_id, id]
  );
  return res.json(query);
});

app.put("/receitas/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_receita_id } = req.body;

  const [query] = await connection.execute(
    "update receitas set descricao = ?, valor = ?, data = ?, categoria_receita_id = ? where id = ?",
    [descricao, valor, data, categoria_receita_id, id]
  );
  return res.json(query);
});

app.delete("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute("delete from usuario where id = ?", [
    id,
  ]);
  return res.json(query);
});

app.delete("/categoria/receita/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "delete from categoria_receita where id = ?",
    [id]
  );
  return res.json(query);
});

app.delete("/categoria/despesa/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "delete from categoria_despesa where id = ?",
    [id]
  );
  return res.json(query);
});

app.delete("/despesas/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "delete from despesas where id = ?",
    [id]
  );
  return res.json(query);
});

app.delete("/receitas/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await connection.execute(
    "delete from receitas where id = ?",
    [id]
  );
  return res.json(query);
});
