import axios from "axios";

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
  baseURL: "http://localhost:9000/api/shopping-online",
});

// export const apiBackEndLogin = axios.create({
//   baseURL: "http://localhost:9000/api/shopping-online",
// });
apiBackEnd.interceptors.request.use( request => {
  if(localStorage.token){
  request.headers['Authorization'] = `Bearer ${localStorage.token}`;
  }
  return request;
})
export default apiBackEnd;
// export default apiBackEndLogin;

