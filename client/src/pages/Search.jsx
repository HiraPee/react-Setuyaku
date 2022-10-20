import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../api/postApi";
import { setPost } from "../redux/features/postSlice";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Favorite from "./Favorite";

const Search = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getAll();
        dispatch(setPost(res));
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ paddingTop: "10px" }}></Box>
        {posts.map((item, index) => (
          <>
            <Box sx={{ border: 2, borderRadius: 1, padding: 2 }}>
              <Box sx={{ display: "flex", ml: 1, justifyContent: "space-between" }}>
                {item.postId}
                <Typography> タイトル: {item.title}</Typography>
                <Favorite data={item} />
              </Box>

              <Typography sx={{ ml: 1 }}> カテゴリー: {item.category}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ml: 1 }}> by: {item.postUserName}</Typography>
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

export default Search;
