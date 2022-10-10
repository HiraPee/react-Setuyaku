const router = require("express").Router();

const postController = require("../controllers/post");
const tokenHandler = require("../handlers/tokenHandler");

//postを作成
router.post("/create", tokenHandler.verifyToken, postController.create);

//ユーザーが投稿したpostを全て取得
router.get("/search", tokenHandler.verifyToken, postController.getAll);

/*


//ログインしているユーザーが投稿したメモを1つ取得
router.get("/search/:postId", tokenHandler.verifyToken, memoController.getOne);

//ログインしているユーザーが投稿したメモを更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

//ログインしているユーザーが投稿したメモを削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);*/

module.exports = router;
