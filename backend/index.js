const express = require("express");
const res = require("express/lib/response");
const app = express();
const PORT = 666;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const mysql = require("mysql2/promise");
const conection = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "EJRMoney",
  user: "root",
  password: "",
});

// seleciona todos os usuários do database
const getAllPessoas = async () => {
  const [query] = await conection.execute("select * from usuario");
  return query;
};

// retorna a lista de usuários
app.get("/usuario", async (req, res) => {
  const resultado = await getAllPessoas();

  if (resultado.length === 0) {
    return res
      .status(200)
      .json({ mensagem: "Nenhum usuário encontrado no database!" });
  }
  return res.status(200).json(resultado);
});

// retorna o usuário pelo seu id
app.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await conection.execute(
    "select * from usuario where id = ?",
    [id]
  );
  if (query.length === 0)
    return res.status(400).json({ mensagem: "Nenhum usuário encontrado!" });
  return res.status(200).json(query);
});

// retorna o usuário pelo nome
app.get("/usuario/buscarnome/:nome", async (req, res) => {
  const { nome } = req.params;
  const [query] = await conection.execute(
    "select * from usuario where nome like ?",
    ["%" + nome + "%"]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({ mensagem: "Nenhum usuário encontrado por este nome!" });
  return res.status(200).json(query);
});

// retorna o usuário pelo email
app.get("/usuario/buscaremail/:email", async (req, res) => {
  const { email } = req.params;
  const [query] = await conection.execute(
    "select * from usuario where email like ?",
    ["%" + email + "%"]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({ mensagem: "Nenhum usuário encontrado por este email!" });
  return res.status(200).json(query);
});

// insere um novo usuário no database
app.post("/usuario", async (req, res) => {
  const { nome, sobrenome, email, senha, cpf } = req.body;
  const [query] = await conection.execute(
    "insert into usuario (nome, sobrenome, email, senha, cpf) values (?, ?, ?, ?, ?)",
    [nome, sobrenome, email, senha, cpf]
  );
  return res.json(query);
});

// atualiza os dados do usuário no database
app.put("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, email, senha, cpf } = req.body;
  const [query] = await conection.execute(
    "update usuario set nome = ?, sobrenome = ?, email = ?, senha = ?, cpf = ? where id = ?",
    [nome, sobrenome, email, senha, cpf, id]
  );
  return res.json(query);
});

//  deleta o usuário do database
app.delete("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await conection.execute("delete from usuario where id = ?", [
    id,
  ]);
  return res.json(query);
});

// categoriaReceita
// seleciona todos os usuários do database
const getAllCategoriaReceitas = async () => {
  const [query] = await conection.execute("select * from categoria_receita");
  return query;
};

// retorna a lista de usuários
app.get("/categoriareceita", async (req, res) => {
  const resultado = await getAllCategoriaReceitas();

  if (resultado.length === 0) {
    return res
      .status(200)
      .json({ mensagem: "Nenhuma categoria-receita encontrado no database!" });
  }
  return res.status(200).json(resultado);
});

// retorna o usuário pelo seu id
app.get("/categoriareceita/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await conection.execute(
    "select * from categoria_receita where id = ?",
    [id]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({
        mensagem:
          "Nenhuma categoria-receita encontrado por este id no database!",
      });
  return res.status(200).json(query);
});

// retorna o usuário pelo nome
app.get("/categoriareceita/buscarcategoria/:nome", async (req, res) => {
  const { nome } = req.params;
  const [query] = await conection.execute(
    "select * from categoria_receita where nome like ?",
    ["%" + nome + "%"]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({
        mensagem: "Nenhuma categoria-receita encontrado por este nome!",
      });
  return res.status(200).json(query);
});

// retorna o usuário pelo email
app.get("/categoriareceita/buscarcategoria/:tipo", async (req, res) => {
  const { tipo } = req.params;
  const [query] = await conection.execute(
    "select * from categoria_receita where tipo like ?",
    ["%" + tipo + "%"]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({
        mensagem: "Nenhuma categoria-receita encontrado por este tipo!",
      });
  return res.status(200).json(query);
});

// insere um novo usuário no database
app.post("/categoriareceita", async (req, res) => {
  const { nome, tipo, usuario_id } = req.body;
  const [query] = await conection.execute(
    "insert into categoria_receita (nome, tipo, usuario_id) values (?, ?, ?)",
    [nome, tipo, usuario_id]
  );
  return res.json(query);
});

// atualiza os dados do usuário no database
app.put("/categoriareceita/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, tipo } = req.body;
  const [query] = await conection.execute(
    "update categoria_receita set nome = ?, tipo = ? where id = ?",
    [nome, tipo]
  );
  return res.json(query);
});

//  deleta o usuário do database
app.delete("/categoriareceita/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await conection.execute(
    "delete from categoria_receita where id = ?",
    [id]
  );
  return res.json(query);
});

// categoriaDispesas
// seleciona todos os usuários do database
const getAllCategoriaDispesa = async () => {
  const [query] = await conection.execute("select * from categoria_despesa");
  return query;
};

// retorna a lista de usuários
app.get("/categoriadispesa", async (req, res) => {
  const resultado = await getAllCategoriaDispesa();

  if (resultado.length === 0) {
    return res
      .status(200)
      .json({ mensagem: "Nenhuma categoria-dispesa encontrado no database!" });
  }
  return res.status(200).json(resultado);
});

// retorna o usuário pelo seu id
app.get("/categoriareceita/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await conection.execute(
    "select * from categoria_receita where id = ?",
    [id]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({
        mensagem:
          "Nenhuma categoria-receita encontrado por este id no database!",
      });
  return res.status(200).json(query);
});

// retorna o usuário pelo nome
app.get("/categoriareceita/buscarcategoria/:nome", async (req, res) => {
  const { nome } = req.params;
  const [query] = await conection.execute(
    "select * from categoria_receita where nome like ?",
    ["%" + nome + "%"]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({
        mensagem: "Nenhuma categoria-receita encontrado por este nome!",
      });
  return res.status(200).json(query);
});

// retorna o usuário pelo email
app.get("/categoriareceita/buscarcategoria/:tipo", async (req, res) => {
  const { tipo } = req.params;
  const [query] = await conection.execute(
    "select * from categoria_receita where tipo like ?",
    ["%" + tipo + "%"]
  );
  if (query.length === 0)
    return res
      .status(400)
      .json({
        mensagem: "Nenhuma categoria-receita encontrado por este tipo!",
      });
  return res.status(200).json(query);
});

// insere um novo usuário no database
app.post("/categoriareceita", async (req, res) => {
  const { nome, tipo, usuario_id } = req.body;
  const [query] = await conection.execute(
    "insert into categoria_receita (nome, tipo, usuario_id) values (?, ?, ?)",
    [nome, tipo, usuario_id]
  );
  return res.json(query);
});

// atualiza os dados do usuário no database
app.put("/categoriareceita/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, tipo } = req.body;
  const [query] = await conection.execute(
    "update categoria_receita set nome = ?, tipo = ? where id = ?",
    [nome, tipo]
  );
  return res.json(query);
});

//  deleta o usuário do database
app.delete("/categoriareceita/:id", async (req, res) => {
  const { id } = req.params;
  const [query] = await conection.execute(
    "delete from categoria_receita where id = ?",
    [id]
  );
  return res.json(query);
});
