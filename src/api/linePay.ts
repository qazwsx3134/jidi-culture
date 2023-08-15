import { AxiosInstance } from "axios";
import type { LinePayConfirmPayload, LinePayPayload } from "./type/linePay";

// Post to backend to get line pay url
export const createLinePayOrder = async (
  axios: AxiosInstance,
  data: LinePayPayload
) => {
  const res = await axios.post("/api/orders/linepay/checkout", data);
  return res.data;
};

export const confirmLinePayOrder = async (
  axios: AxiosInstance,
  data: LinePayConfirmPayload
): Promise<{
  email: string;
  buyerName: string;
  orderId: string;
  transactionId: string;
  status: string;
}> => {
  const res = await axios.post("/api/orders/linepay/confirm", data);
  return res.data;
};
