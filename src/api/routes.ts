import { http } from "../utils/http";
import { responseType } from "/@/utils/http/types";

export const getAsyncRoutes = (params?: object): Promise<responseType> => {
  return http.request("get", "/seed/menu/routers", { params });
};
