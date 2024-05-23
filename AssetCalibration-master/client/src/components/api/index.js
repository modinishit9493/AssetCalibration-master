import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getAllAssets = () => api.get(`/assets`);
export const insertAsset = (payLoad) => api.post("/asset", payLoad);
export const getAssetById = (id) => api.get(`/asset/${id}`);
export const updateAssetById = (id, payload) =>
  api.put(`/asset/${id}`, payload);
export const deleteAssetById = (id) => api.delete(`/asset/${id}`);

export const fileUploadToServer = (payLoad) => api.post("/upload", payLoad);

export const login = (payLoad) => api.post("/login", payLoad);
export const signup = (payLoad) => api.post("/signup", payLoad);

export const getAllUsers = () => api.get("/users");
export const insertUser = (payLoad) => api.post("/user", payLoad);
export const getUserById = (id) => api.get(`/user/${id}`);
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = (id) => api.delete(`/user/${id}`);

const apis = {
  getAllAssets,
  insertAsset,
  getAssetById,
  updateAssetById,
  deleteAssetById,
  fileUploadToServer,
  login,
  signup,
  getAllUsers,
  insertUser,
  getUserById,
  updateUserById,
  deleteUserById,
};

export default apis;
