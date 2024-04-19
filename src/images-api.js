import axios from "axios";
const AUTH_KEY = "HVVbUNNZTtHkh7SV5nJXigFdNXwVW7ejxukzYuAxSG0";
axios.defaults.baseURL = "https://api.unsplash.com";
export default async function fetchImages(request, page) {
  return axios.get(`/search/photos/`, {
    params: {
      client_id: AUTH_KEY,
      query: request,
      page: page,
    },
  });
}
