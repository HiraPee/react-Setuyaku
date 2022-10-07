const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  // errが存在する場合エラー内容のリストを返す
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(400).json({ errs: errs.array() });
  }
  next();
};
