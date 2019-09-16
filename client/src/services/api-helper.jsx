import axios from "axios";
const baseUrl = "http://localhost:3000";

export const loginUser = loginData => {
  const opts = {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(`${baseUrl}/auth/login`, opts).then(resp => resp.json());
};

export const registerUser = registerData => {
  const opts = {
    method: "POST",
    body: JSON.stringify({ user: registerData }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(`${baseUrl}/users/`, opts).then(resp => resp.json());
};

const BASE_URL = "http://localhost:3000";
const JWT_TOKEN = localStorage.getItem("token");
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`
  }
});

export const showFavesOfUser = async userId => {
  try {
    let userId = localStorage.getItem("userId");
    return apiClient.get(`/favorites/${userId}`).then(res => res.data);
  } catch (e) {
    throw e;
  }
};

export const createBeer = async beerResult => {
  try {
    const response = await apiClient.post("/beers", beerResult);
    console.log(response);
    return response;
  } catch (e) {
    throw e;
  }
};

export const getBeerId = async name => {
  try {
    const response = await apiClient.get(`/beers/name/?name=${name}`);
    console.log(response.data.id);
    return response.data.id;
  } catch (e) {
    throw e;
  }
};

export const favoriteBeer = async beerId => {
  try {
    let userId = localStorage.getItem("userId");
    console.log(userId);
    console.log(beerId);
    const response = await apiClient.post(`/favorites/${userId}/${beerId}`);
    console.log(response);
    return response;
  } catch (e) {
    throw e;
  }
};

export const deleteBeer = async beerId => {
  try {
    await apiClient.delete(`/beers/${beerId}`);
  } catch (e) {
    throw e;
  }
};

export const UpdateBeerReview = async (beerId, value) => {
  try {
    const response = await apiClient.put(`/beers/${beerId}`, { rating: value });
    console.log(response);
    return response;
  } catch (e) {
    throw e;
  }
};
