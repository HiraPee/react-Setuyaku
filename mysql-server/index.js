const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

require("dotenv").config();

app.use(express.json()); //jsonのリクエスト/レスポンスを正しく受け取る為に必要
app.use(cors({ origin: "http://localhost:3000" })); // corsを有効にする

app.use("/api/v1", require("./src/v1/routes"));

const { database } = require("./src/v1/models/sql"); //mysqlに接続するためのインストール
try {
  database();
  console.log("Mysql接続中");
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => res.send("Hello Express!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
