const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { database } = require("../models/sql"); //mysqlに接続するためのインストール

//ユーザーの新規登録
exports.register = async (req, res) => {
  //パスワードの暗号化
  const password = req.body.password;
  req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
  console.log("動いている");

  try {
    //ユーザー新規作成
    const params = [req.body.username, req.body.password];
    //JWTの発行
    const token = JWT.sign({ username: req.body.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: "24h" });

    const sql = "INSERT INTO users (name, password) VALUES (?, ?)";
    await database().query(sql, params, (err, rows, results) => {
      if (err) throw err;
      return res.status(200).json({ params, token });
    });
    console.log("登録完了");
    res.status(200).json({ params, token });
    //database().end();
  } catch (err) {
    database().end();
    return res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const sql = "SELECT * FROM users  WHERE name = ? LIMIT 1";
    await database().query(sql, [username], (err, rows, results) => {
      //ユーザーが存在しているか
      if (!Object.keys(rows).length) {
        res.status(401).json({
          errs: [
            {
              param: "username",
              msg: "ユーザーが存在しません",
            },
          ],
        });
      }

      //パスワードが合っているか
      if (password !== CryptoJS.AES.decrypt(rows[0]["password"], process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)) {
        res.status(401).json({
          errs: [
            {
              param: "password",
              msg: "パスワードが無効です.",
            },
          ],
        });
      }

      //JWTの発行
      const token = JWT.sign({ username: rows[0]["name"] }, process.env.TOKEN_SECRET_KEY, { expiresIn: "24h" });
      //console.log("ログイン成功");
      res.status(201).json({ rows, token });
      database().end();
    });
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};
