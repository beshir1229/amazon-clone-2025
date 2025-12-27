import axios from "axios";

const axiosInstance = axios.create({
  // local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-2025-d991f/us-central1/api",
// deploy version of firebase function
  baseURL:"https://us-central1-clone-2025-d991f.cloudfunctions.net/api",
  // deployed version of amazon server on render.com
  //  baseURL:"https://amazon-api-deploy-42gt.onrender.com/"
});

export { axiosInstance };
