import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [userNameErrText, setUserNameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  let error = false;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserNameErrText("");
    setPasswordErrText("");
    //入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    //console.log(password);
    //console.log(confirmPassword);
    if (username === "") {
      error = true;
      setUserNameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }

    if (error) {
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.login({ username, password });
      console.log(res);
      localStorage.setItem("token", res.token);
      console.log("ログイン成功");
      localStorage.setItem("userName", res.rows[0].name);
      navigate("/");
    } catch (err) {
      //console.log(err);
      const errors = err.data.errs;
      console.log(errors);
      errors.forEach((e) => {
        if (e.param === "username") {
          setUserNameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField fullWidth id="username" label="お名前" margin="normal" name="username" required helperText={userNameErrText} error={userNameErrText !== ""} disabled={loading} />
        <TextField fullWidth id="password" label="パスワード" margin="normal" name="password" required type="password" helperText={passwordErrText} error={passwordErrText !== ""} disabled={loading} />
        <LoadingButton sx={{ mt: 3, mb: 2 }} fullWidth type="submit" loading={loading} color="primary" variant="outlined">
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
