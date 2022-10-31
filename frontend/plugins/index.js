export default ({ $axios, $config: { BACKEND_API } }) => {
  $axios.defaults.baseURL = BACKEND_API;
};
