import axiosClient from "./axiosClient";

const memoApi = {
  create: (params) => axiosClient.post("post/create", params),
  getAll: () => axiosClient.get("post/search"),
  //getOne: (id) => axiosClient.get(`memo/${id}`),
  //update: (id, params) => axiosClient.put(`memo/${id}`, params),
  //delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
