import axios from "axios";
import type { LinePayConfirmPayload, LinePayPayload } from "./type/linePay";

// Post to backend to get line pay url
export const createLinePayOrder = async (data: LinePayPayload) => {
  const res = await axios.post("/api/orders/linepay/checkout", data);
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
  const res = await axios.post("/api/orders/linepay/confirm", data);
  return res.data;
};
