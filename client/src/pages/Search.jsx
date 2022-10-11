import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../api/postApi";
import { setPost } from "../redux/features/postSlice";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const Search = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getAll();
        console.log(res);
        dispatch(setPost(res));
        //console.log(memos);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [dispatch]);

  const onFavChange = async () => {
    //お気に入りボタンを押したとき
    if (fav) {
      setFav(true);
    } else {
      //お気に入りボタンを解除した時
      setFav(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ paddingTop: "10px" }}></Box>
        {posts.map((item, index) => (
          <>
            <Box sx={{ border: 2, borderRadius: 1, padding: 2 }}>
              {item.postId}
              <Box sx={{ display: "flex", ml: 1, justifyContent: "space-between" }}>
                <Typography> タイトル: {item.title}</Typography>
                <IconButton onClick={onFavChange}>
                  <StarBorderOutlinedIcon />
                </IconButton>
              </Box>

              <Typography sx={{ ml: 1 }}> カテゴリー: {item.category}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ml: 1 }}> by: {item.postUserName}</Typography>
                <Typography sx={{ mr: 3 }} component={Link} to={`/search/${item.postId}`} key={item.postId}>
                  {" "}
                  詳細
                </Typography>
              </Box>
            </Box>
            <Box sx={{ paddingTop: "10px" }}></Box>
          </>
        ))}
      </Container>
    </>
  );
};

export default Search;
