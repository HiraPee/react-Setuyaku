const JWT = require("jsonwebtoken");
const { database } = require("../models/sql"); //mysqlに接続するためのインストール

//クライアントから渡されたJWTが正常化検証
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  console.log("tokenDecode");
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//JWT認証を検証するためのミドルウェア

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  console.log("verify-token");
  if (tokenDecoded) {
    const sql = "SELECT * FROM users  WHERE name = ? LIMIT 1";
    try {
      await database().query(sql, [tokenDecoded.username], (err, rows, results) => {
        if (!rows) {
          return res.status(401).json("権限がありません");
        }
        req.user = rows;
        //console.log("JWT認証成功");
        next();
      });
    } catch (err) {
      return res.status(401).json(err);
    }
  } else {
    return res.status(401).json("権限がありません");
  }
};
