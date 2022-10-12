const router = require("express").Router();

const postController = require("../controllers/post");
const tokenHandler = require("../handlers/tokenHandler");

//postを作成
router.post("/create", tokenHandler.verifyToken, postController.create);

//ユーザーが投稿したpostを全て取得
router.get("/search", tokenHandler.verifyToken, postController.getAll);

//ユーザーが投稿したpostを1つ取得
router.get("/search/:postId", tokenHandler.verifyToken, postController.getOne);

module.exports = router;
