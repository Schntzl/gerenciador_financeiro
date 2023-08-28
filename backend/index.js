const express = require("express");

const app = express();

app.listen(666, () => console.log("Hades."));

app.get("/", (req, res) => {
  res.send("Pode entrar.");
});

app.get("/cachorro", (req, res) => {
  res.send("AuAu.");
});

app.get("/aomosso", (req, res) => {
  res.send("Ja podih ao mossar?");
});

app.get("/fim", (req, res) => {
  res.end();
});

const dados = ["Jôáo"];

app.get("/j", (req, res) => {
  res.json({ dados });
});
