const DOMAIN = "http://www.socialnetwork.somee.com";
// Đây là file chứa API server
const API = {
  // GET_ADDRESS:
  //   DOMAIN +
  //   "/front/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country",
  // POST_ADDRESS: DOMAIN + "/front/self/address",
  // PUT: DOMAIN + "/front/self/address/",
  LOGIN: DOMAIN + "/api/auth/login",
  REGISTER: DOMAIN + "/api/auth/register",
  VERIFY_PIN: DOMAIN + "/api/auth/VerifyPin",
  RESEND_MAIL: DOMAIN + "/api/auth/ReSendMail",
  GET_ALL_POST: DOMAIN + "/api/post",
  GET_ID_POST: DOMAIN + "/api/post/:id",
  POST_IMAGE: DOMAIN + "/api/post/upload",
  POST_CONTENT: DOMAIN + "/api/post",
  GET_INFO: DOMAIN + "/api/infor/user/:id",
  POST_INFO: DOMAIN + "/api/infor/create",
  POST_COMMENT: DOMAIN + "/api/cmt/create",
  GET_ALL_FRIEND: DOMAIN + "/api/Friend/getAll",
  // POST_LIKE:DOMAIN + "api/like/{id}"
};
export default API;
