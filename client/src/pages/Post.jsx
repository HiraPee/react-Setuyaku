import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import postApi from "../api/postApi";

const Post = () => {
  const [contents, setContents] = useState("");
  const [forms, setForms] = useState(1);

  const handleChange = (e) => {
    setContents(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const title = data.get("title");
    const category = contents;
    const description = data.get("description");
    try {
      await postApi.create({ category, title, description });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl sx={{ mt: 3, minWidth: 130 }}>
            <InputLabel id="inputContents">コンテンツ</InputLabel>
            <Select id="selecteContents" value={contents} onChange={handleChange} autoWidth label="コンテンツ">
              <MenuItem value={"無題"}>無題</MenuItem>
              <MenuItem value={"掃除"}>掃除</MenuItem>
              <MenuItem value={"食事"}>食事</MenuItem>
              <MenuItem value={"資産"}>資産</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth id="title" label="タイトル" margin="normal" name="title" required />
          <TextField fullWidth multiline rows={4} id="description" label="説明" margin="normal" name="description" required />

          <LoadingButton sx={{ mt: 3, mb: 2 }} fullWidth type="submit" color="primary" variant="outlined">
            のせる！！
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
};

export default Post;
