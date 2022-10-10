import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import money_eco_logo from "../../assets/images/money_eco.png";
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //JWTを持っているか確認する
    const checkAuth = async () => {
      //認証チェック
      const isAuth = await authUtils.isAuthenticated();
      console.log(isAuth);
      if (isAuth) {
        navigate("/");
      } else {
        navigate("login");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={money_eco_logo} alt="" style={{ width: 100, height: 100, marginBottom: 3 }} />
          節約術共有アプリ
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};

export default AuthLayout;
