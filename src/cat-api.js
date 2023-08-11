import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_q5Sv8wKWBBD676Cr6aWORoWIZ01wZeq3jFwhmPhpQWtEFoo5WAxxVKYxTQkz4XVJ';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const IMAGE_URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchCatByBreed(breedId) {
  return axios.get(`${IMAGE_URL}?breed_ids=${breedId}`).then(response => {
    if (!response.status) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

export function fetchBreeds() {
  return axios.get(BASE_URL).then(response => {
    if (!response.status) {
      throw new Error(response.status);
    }
    return response.data;
  });
}
