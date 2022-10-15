import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import favApi from "../api/favApi";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { Box, Container, IconButton, Typography } from "@mui/material";

const Favorite = (props) => {
  //const user = useSelector((state) => state.user.value);
  const [faved, setFaved] = useState(false);
  //const userName = user.name;
  const userName = localStorage.getItem("userName");
  //const [userName, setUserName] = useState(props.userName);

  useEffect(async () => {
    //const userName = user.name;
    const favPostId = props.data.postId;
    try {
      const res = await favApi.getOne({ userName, favPostId });
      if (res.length === 0) {
        setFaved(false);
      } else {
        setFaved(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [faved]);

  const removeFav = async (item) => {
    //const userName = user.name;
    const favPostId = item.postId;
    //console.log(userName);

    try {
      await favApi.delete({ userName, favPostId });
      setFaved(false);
    } catch (err) {
      console.log(err);
    }
  };

  const saveFav = async (item) => {
    //const userName = user.name;
    const favPostId = item.postId;
    //console.log(userName);

    try {
      const res = await favApi.create({ userName, favPostId });
      console.log(res);
      setFaved(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {faved === true ? (
        <IconButton onClick={() => removeFav(props.data)} key={props.data}>
          <StarIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => saveFav(props.data)} key={props.data}>
          <StarBorderOutlinedIcon />
        </IconButton>
      )}
    </>
  );
};

export default Favorite;
