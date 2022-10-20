const { database } = require("../models/sql"); //mysqlに接続するためのインストール

//１つの投稿にお気に入りを作成
exports.create = async (req, res) => {
  //console.log("create");

  try {
    const userName = req.body.userName; //ユーザーネーム
    const favPostId = req.body.favPostId; //お気に入りしたpostのID

    const sql = "INSERT INTO favs (name,postId) VALUES (?, ?)";
    const params = [userName, favPostId];
    await database().query(sql, params, (err, rows, results) => {
      if (err) throw err;

      //console.log("お気に入りを保存しました");
      res.status(201).json(rows);
      database().end();
    });
  } catch (err) {
    res.status(500).json(err);
    database().end();
  }
};

//指定したIDがお気に入りとして登録されているか判定
exports.isFav = async (req, res) => {
  const userName = req.body.userName;
  const favPostId = req.body.favPostId;

  try {
    const sql = "SELECT * FROM favs  WHERE name=? AND postId = ?  LIMIT 1";
    await database().query(sql, [userName, favPostId], (err, rows, results) => {
      if (err) throw err;
      res.status(201).json(rows);
      database().end();
    });
  } catch (err) {
    res.status(500).json(err);
    database().end();
  }
};

exports.getAll = async (req, res) => {
  const userName = req.body.userName;
  try {
    //const sql = "SELECT * FROM favs  WHERE name=? ";
    //const sql = "SELECT * FROM posts  WHERE  name = ? IN (SELECT postId FROM favs WHERE :name = ?)";
    const sql = "SELECT * FROM posts  WHERE  postId IN (SELECT postId FROM favs WHERE name = ?)";
    await database().query(sql, [userName], (err, rows, results) => {
      if (err) throw err;
      //console.log(rows);
      res.status(201).json(rows);
      database().end();
    });
  } catch (err) {
    res.status(500).json(err);
    database().end();
  }
};

//削除依頼を出したユーザーが投稿IDを指定してお気に入り削除をしている機能
exports.delete = async (req, res) => {
  //console.log("delete");

  try {
    const userName = req.body.userName; //ユーザーネーム
    const favPostId = req.body.favPostId; //お気に入りを解除したpostのID

    const sql = "DELETE FROM favs WHERE name=?  AND postId=?  LIMIT 1";
    const params = [userName, favPostId];
    await database().query(sql, params, (err, rows, results) => {
      if (err) throw err;
      //console.log("お気に入りを削除しました");
      res.status(201).json(rows);
      database().end();
    });
  } catch (err) {
    res.status(500).json(err);
    database().end();
  }
};
