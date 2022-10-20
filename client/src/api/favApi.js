import axiosClient from "./axiosClient";

const favApi = {
  create: (params) => axiosClient.post("fav/create", params),
  getAll: (params) => axiosClient.post("fav/search", params),
  getOne: (params) => axiosClient.post(`fav/isFav`, params),
  //getFavAll: (params) => axiosClient.post(`fav/getAll`, params),
  //update: (id, params) => axiosClient.put(`memo/${id}`, params),
  delete: (params) => axiosClient.post("fav/delete", params),
};

export default favApi;
