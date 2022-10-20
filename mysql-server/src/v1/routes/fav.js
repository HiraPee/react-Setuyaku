const router = require("express").Router();

const favController = require("../controllers/fav");
const tokenHandler = require("../handlers/tokenHandler");

//postを作成
router.post("/create", tokenHandler.verifyToken, favController.create);

//ユーザーがお気に入りしたかを判定
router.post("/isFav/", tokenHandler.verifyToken, favController.isFav);

//ユーザーがお気に入りしたpostを全て取得
//router.post("/getAll", tokenHandler.verifyToken, favController.getAll);

//ユーザーがお気に入りしたpostを全て取得
router.post("/search", tokenHandler.verifyToken, favController.getAll);

//ユーザーが指定したpostを削除
router.post("/delete", tokenHandler.verifyToken, favController.delete);

module.exports = router;
