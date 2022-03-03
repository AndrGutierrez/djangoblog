import axios from "axios";

const config = { withCredentials: true };
export async function getModel(path, id) {
  const MODEL_PATH = `${path}/${id}`;
  return axios.get(MODEL_PATH, config).then(({ data }) => data);
}

export async function listModel(path, setProgress, progress) {
  const config = {
    ...config,
    onDownloadProgress: (progressEvent) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    },
  };

  return axios.get(path, config).then(({ data }) => {
    return data;
  });
}

export async function createWithMedia(path, data, setProgress) {
  const config = {
    data,
    method: "post",
    url: path,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const total = parseFloat(
        progressEvent.currentTarget.responseHeaders["Content-Length"]
      );
      const current = progressEvent.currentTarget.response.length;

      let percentCompleted = Math.floor((current / total) * 100);
    },
  };
  return axios(config);
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
      // do whatever you like with the percentage complete
      // maybe dispatch an action that will update a progress bar or something
    },
  };
  return axios
    .delete(MODEL_PATH, deleteConfig)
    .then((response) => response.data);
}
