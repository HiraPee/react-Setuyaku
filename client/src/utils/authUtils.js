import authApi from "../api/authApi";

const authUtils = {
  //JWTチェック
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    console.log("ここは動いている");
    if (!token) return false;

    try {
      const res = await authApi.verifyToken();
      console.log(res);
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
