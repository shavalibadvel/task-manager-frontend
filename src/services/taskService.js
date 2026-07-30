import axios from "axios";

const API = `${process.env.REACT_APP_API_URL || ""}/api/tasks`;

export const getTasks = () => axios.get(API).then((res) => res.data);

export const createTask = (formData) => axios.post(API, formData).then((res) => res.data);

export const updateTask = (id, formData) =>
  axios.put(`${API}/${id}`, formData).then((res) => res.data);

export const markAsDone = (id) => axios.patch(`${API}/${id}/done`).then((res) => res.data);

export const deleteTask = (id) => axios.delete(`${API}/${id}`);

// Used directly as an anchor href by the download button.
export const fileUrl = (id) => `${API}/${id}/file`;