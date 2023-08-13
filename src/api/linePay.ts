import { axiosInstance } from ".";
import type { LinePayPayload } from "./type/linePay";

// Post to backend to get line pay url
export const createLinePayOrder = async (data: LinePayPayload) => {
  const res = await axiosInstance.post("/api/orders/linepay/checkout", data);
  return res.data;
};
