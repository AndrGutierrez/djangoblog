import axios from "axios";

const config = { withCredentials: true };
export async function getModel(path, id) {
  const MODEL_PATH = `${path}/${id}`;
  return axios.get(MODEL_PATH, config).then((response) => response.data);
}

export async function listModel(path) {
  return axios.get(path, config).then((response) => response.data);
}
