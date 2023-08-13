export interface LinePayPayload {
  amount: number;
  feeAmount?: number;
  redirectUrls: {
    confirmUrl: string;
    cancelUrl: string;
  };
  packages: {
    id: string;
    amount: number;
    userFee?: number;
    products: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      imageUrl?: string;
    }[];
  }[];
  address: {
    country?: string;
    postalCode?: string;
    state?: string;
    city?: string;
    detail: string;
    optional?: string;
    recipient: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNo: string;
    };
  };
}