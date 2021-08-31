import axios from 'axios';
import {getItem} from '@/helpers/persistanceStorage';

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.defaults.headers.get['header-name'] = 'value';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';
//axios.defaults.baseURL = 'http://laravel-realworld-example-app/api';
//axios.defaults.baseURL = 'http://laravel-realworld-example-app/api';

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken');
  const authorizationToken = token ? `Token ${token}` : '';
  config.headers.Authorization = authorizationToken;

  return config;
});

export default axios;
