const router = require("express").Router();
const { body } = require("express-validator");
const { database } = require("../models/sql"); //mysqlに接続するためのインストール
const userController = require("../controllers/user");

const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");

//新規登録API
router.post(
  "/register",
  body("username").isLength({ min: 8 }).withMessage("ユーザー名は8文字以上である必要があります"),
  body("password").isLength({ min: 8 }).withMessage("パスワードは8文字以上である必要があります"),
  body("confirmPassword").isLength({ min: 8 }).withMessage("確認用パスワードは8文字以上である必要があります"),
  body("username").custom((value) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users  WHERE name = ? LIMIT 1";
      database().query(sql, [value], (err, rows, results) => {
        //ユーザーが存在する場合エラーを吐く
        if (rows.length !== 0) reject("このユーザーは存在しています");
        resolve();
      });
    });
  }),
  validation.validate,
  userController.register
);

router.post("/login", body("username").isLength({ min: 4 }).withMessage("ユーザー名は4文字以上である必要があります"), body("password").isLength({ min: 8 }).withMessage("パスワードは8文字以上である必要があります"), validation.validate, userController.login);

router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
