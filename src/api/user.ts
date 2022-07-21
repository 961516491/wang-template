import { http } from "../utils/http";
import { responseType } from "/@/utils/http/types";
interface userType extends Promise<any> {
  svg?: string;
  code?: number;
  info?: object;
}

interface LoginForm {
  username: string;
  password: string;
  captcha: string;
  cvc: string;
}

// 获取验证码
export const getVerify = (): userType => {
  return http.request("get", "/captcha");
};

// 登录
export const getLogin = (data: LoginForm) => {
  // const data = qs.stringify(data1);
  return http.request("post", "/seed/sys/sign", {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: data
  });
};

// 获取用户信息
export const getInfo = (): Promise<responseType> => {
  return http.request("get", "/seed/user/full");
};

// 刷新token
export const refreshToken = (data: object) => {
  return http.request("post", "/refreshToken", { data });
};
