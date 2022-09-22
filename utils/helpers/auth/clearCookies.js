import cookie from "js-cookie";

const clear = () => {
  cookie.remove("nkuba-access-token");
  cookie.remove("nkuba-refresh-token");
  cookie.remove("nkuba-id-token");
};
export default clear;
