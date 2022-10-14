import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../api/postApi";
import { setPost } from "../redux/features/postSlice";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getUserPosts({ userName });
        dispatch(setPost(res));
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [dispatch]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ paddingTop: "10px" }}></Box>
        {posts.map((item, index) => (
          <>
            <Box sx={{ border: 2, borderRadius: 1, padding: 2 }}>
              <Box sx={{ display: "flex", ml: 1, justifyContent: "space-between" }}>
                <Typography> タイトル: {item.title}</Typography>
              </Box>

              <Typography sx={{ ml: 1 }}> カテゴリー: {item.category}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ml: 1 }}> by: you</Typography>
                <Typography sx={{ mr: 3 }} component={Link} to={`/search/${item.postId}`} key={item.postId}>
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

export default Home;
