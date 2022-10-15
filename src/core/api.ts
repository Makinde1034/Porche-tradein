import axios from 'axios';

const localDomain = document.location.origin || 'https://dev.porsche.local';

const HttpClient = axios.create({
  baseURL: `${localDomain}/api/`,
});

export default HttpClient;
