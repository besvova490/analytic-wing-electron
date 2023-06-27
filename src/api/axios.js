import axios from "axios";

let authTokenRequest = null;

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" }
});

function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = requestNewToken();
    authTokenRequest.finally(resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function requestNewToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  return axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh/`, { refresh: refreshToken }).then(res => {
    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);
  }).catch(error => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken"); // for cookie set from storefront
      localStorage.removeItem("refreshToken");
      location.reload();
    }
  });
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

client.interceptors.response.use(r => r, error => {
  if (!error.response) {
    return Promise.reject(error);
  }

  const originalRequest = error.config;

  // Don't try to renew while login in
  if (error.response.status === 401 && originalRequest.url) {
    if (originalRequest.url === "/auth/") {
      return Promise.reject(error.response ? error.response : error);
    }
  }

  if (error.response.status === 401 && !originalRequest.__isRetryRequest) {
    originalRequest.__isRetryRequest = true;

    return getAuthToken().then(() => {
      const accessToken = localStorage.getItem("accessToken");
      originalRequest.headers.Authorization = `JWT ${accessToken}`;

      return client(originalRequest);
    }).catch(() => Promise.reject(Error("Failed to obtain renew token")));
  }

  return Promise.reject(error.response ? error.response : error);
});


const request = function(options) {
  const accessToken = localStorage.getItem("accessToken");

  const onSuccess = function(response) {
    return response.data;
  };
  const onError = function(error) {
    return Promise.reject(error);
  };

  if (accessToken) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = `JWT ${accessToken}`;
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;

// SWR fetcher
export const swrFetcher = (url, config) => {
  return client.get(`${process.env.REACT_APP_API_URL}${url}`, config).then(res => res.data);
};
