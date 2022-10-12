const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/post", require("./post"));
router.use("/fav", require("./fav"));

module.exports = router;
