import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../api/postApi";
import { setPost } from "../redux/features/postSlice";
import { Box, Container, Typography } from "@mui/material";

const Search = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value);

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

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ paddingTop: "10px" }}></Box>
        {posts.map((item, index) => (
          <>
            <Box sx={{ border: 2 }}>
              <Typography sx={{ ml: 1 }}> タイトル: {item.title}</Typography>
              <Typography sx={{ ml: 1 }}> カテゴリー: {item.category}</Typography>
              <Typography sx={{ ml: 1 }}> by: {item.postUserName}</Typography>
            </Box>
            <Box sx={{ paddingTop: "10px" }}></Box>
          </>
        ))}
      </Container>
    </>
  );
};

export default Search;
