import axios from "axios";
import { setProgress } from "../store/loadingSlice";

const config = { withCredentials: true };
export async function getModel(path, id) {
  const MODEL_PATH = `${path}/${id}`;
  return axios.get(MODEL_PATH, config).then((response) => response.data);
}

export async function listModel(path) {
  return axios.get(path, config).then((response) => response.data);
}

export async function createWithMedia(path, data) {
  const config = {
    data,
    method: "post",
    url: path,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      let percentCompleted = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
      // do whatever you like with the percentage complete
      // maybe dispatch an action that will update a progress bar or something
    },
  };
  axios(config);
}

export async function deleteModel(path, id) {
  const MODEL_PATH = path;
  const deleteConfig = {
    ...config,
    data: { id: id },
    onUploadProgress: (progressEvent) => {
      let percentCompleted = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
      // do whatever you like with the percentage complete
      // maybe dispatch an action that will update a progress bar or something
    },
  };
  return axios
    .delete(MODEL_PATH, deleteConfig)
    .then((response) => response.data);
}
