import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../api/postApi";
import favApi from "../api/favApi";
import { setPost } from "../redux/features/postSlice";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";

const Search = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value);
  const user = useSelector((state) => state.user.value);
  const [faved, setFaved] = useState(false);

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

  useEffect(() => {}, [faved]);

  const removeFav = async (item) => {
    console.log("delete fav");
    const userName = user.name;
    const favPostId = item.postId;

    try {
      await favApi.delete({ userName, favPostId });
    } catch (err) {
      console.log(err);
    }

    //console.log(favPostId);
    //console.log(userName);
  };

  const saveFav = async (item) => {
    console.log("save fav");
    const userName = user.name;
    const favPostId = item.postId;

    try {
      await favApi.create({ userName, favPostId });
    } catch (err) {
      console.log(err);
    }
  };

  const isFaved = async (item) => {
    const userName = user.name;
    const favPostId = item.postId;
    console.log(favPostId);

    try {
      await favApi.getOne({ userName, favPostId });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ paddingTop: "10px" }}></Box>
        {posts.map((item, index) => (
          <>
            <Box sx={{ border: 2, borderRadius: 1, padding: 2 }}>
              <Box sx={{ display: "flex", ml: 1, justifyContent: "space-between" }}>
                <Typography> タイトル: {item.title}</Typography>

                {true === isFaved(item) ? (
                  <IconButton onClick={() => removeFav(item)} key={item}>
                    <StarIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => saveFav(item)} key={item}>
                    <StarBorderOutlinedIcon />
                  </IconButton>
                )}
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
