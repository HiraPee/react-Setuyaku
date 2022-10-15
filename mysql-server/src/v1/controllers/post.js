const { database } = require("../models/sql"); //mysqlに接続するためのインストール

exports.create = async (req, res) => {
  try {
    const username = req.user[0].name;
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;

    const sql = "INSERT INTO posts (category,postUserName,title,description) VALUES (?, ?, ?, ?)";
    const params = [category, username, title, description];
    await database().query(sql, params, (err, rows, results) => {
      //if (err) throw err;
      console.log("投稿を保存しました");
      database().end();
      res.status(201).json(rows);
    });
    database().end();
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM posts ORDER BY timeline DESC";
    await database().query(sql, (err, posts, results) => {
      //if (err) throw err;

      res.status(201).json(posts);
    });
    database().end();
    console.log("post_getAll");
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};

exports.getUserPosts = async (req, res) => {
  console.log(req.body);
  const userName = req.body.userName;
  console.log("getUserPosts");
  try {
    const sql = "SELECT * FROM posts WHERE postUserName = ? ORDER BY timeline DESC";
    await database().query(sql, [userName], (err, posts, results) => {
      //if (err) throw err;
      res.status(201).json(posts);
    });
    database().end();
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  const { postId } = req.params;
  try {
    const sql = "SELECT * FROM posts  WHERE postId = ?";
    await database().query(sql, [postId], (err, rows, results) => {
      console.log(rows);
      //if (err) throw err;

      res.status(201).json(rows[0]);
    });
    database().end();
  } catch (err) {
    database().end();
    res.status(500).json(err);
  }
};
