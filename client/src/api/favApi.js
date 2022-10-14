import axiosClient from "./axiosClient";

const favApi = {
  create: (params) => axiosClient.post("fav/create", params),
  getAll: () => axiosClient.get("fav/search"),
  getOne: (params) => axiosClient.post(`fav/isFav`, params),
  //update: (id, params) => axiosClient.put(`memo/${id}`, params),
  delete: (params) => axiosClient.post("fav/delete", params),
};

export default favApi;
