const { database } = require("../models/sql"); //mysqlに接続するためのインストール

//１つの投稿にお気に入りを作成
exports.create = async (req, res) => {
  console.log("create");
  //console.log(req.body);
  try {
    const userName = req.body.userName;
    const favPostId = req.body.favPostId;

    //console.log(userName);

    const sql = "INSERT INTO favs (name,postId) VALUES (?, ?)";
    const params = [userName, favPostId];
    await database().query(sql, params, (err, rows, results) => {
      if (err) throw err;

      console.log("お気に入りを保存しました");
      res.status(201).json(rows);
    });
    database().end();
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};

//指定したIDがお気に入りとして登録されているか判定
exports.isFav = async (req, res) => {
  const userName = req.body.userName;
  const favPostId = req.body.favPostId;
  //console.log("getOne");

  try {
    const sql = "SELECT * FROM favs  WHERE name=? AND postId = ?  LIMIT 1";
    await database().query(sql, [userName, favPostId], (err, rows, results) => {
      if (err) throw err;
      console.log("getOne");

      //res.send(rows);
      res.status(201).json(rows);
      console.log("終わったよ");
      database().end();
      //database().end();
      //return res.status(201).json(rows);
    });
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  const userName = req.body.userName;
  console.log("getAll");
  try {
    const sql = "SELECT * FROM favs  WHERE name=? ";
    await database().query(sql, [userName], (err, rows, results) => {
      if (err) throw err;

      res.status(201).json(rows);
      database().end();
    });
    //database().end();
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};

//削除依頼を出したユーザーが投稿IDを指定してお気に入り削除をしている機能
exports.delete = async (req, res) => {
  console.log("delete");

  try {
    const userName = req.body.userName;
    const favPostId = req.body.favPostId;

    //const sql = "INSERT INTO favs (name,postId) VALUES (?, ?)";
    const sql = "DELETE FROM favs WHERE name=?  AND postId=?  LIMIT 1";
    const params = [userName, favPostId];
    await database().query(sql, params, (err, rows, results) => {
      if (err) throw err;
      console.log("お気に入りを削除しました");
      res.status(201).json(rows);
    });
    database().end();
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};
