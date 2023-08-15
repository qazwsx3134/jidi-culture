import { axiosInstance } from ".";
import type { LinePayConfirmPayload, LinePayPayload } from "./type/linePay";

// Post to backend to get line pay url
export const createLinePayOrder = async (data: LinePayPayload) => {
  const res = await axiosInstance.post("/api/orders/linepay/checkout", data);
  return res.data;
};

export const confirmLinePayOrder = async (
  data: LinePayConfirmPayload
): Promise<{
  email: string;
  buyerName: string;
  orderId: string;
  transactionId: string;
  status: string;
}> => {
  const res = await axiosInstance.post("/api/orders/linepay/confirm", data);
  console.log('api data',res.data);
  return res.data;
};
