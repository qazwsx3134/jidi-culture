import { z } from "@builder.io/qwik-city";

export type OrderFormType = z.infer<typeof orderSchema>;

export const orderSchema = z.object({
  amount: z.number(),
  feeAmount: z.number().optional(),
  redirectUrls: z.object({
    confirmUrl: z.string(),
    cancelUrl: z.string(),
  }),
  packages: z.array(
    z.object({
      id: z.string(),
      amount: z.number(),
      userFee: z.number().optional(), // 手續費
      products: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          price: z.number(), //單價
          quantity: z.number(), //數量
          imageUrl: z.string().optional(),
        })
      ),
    })
  ),
  address: z.object({
    country: z.string().max(2).optional(),
    postalCode: z.string().max(10).optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    detail: z.string().nonempty("請輸入地址"),
    optional: z.string().optional(),
    recipient: z.object({
      firstName: z.string().nonempty("請輸入姓氏"),
      lastName: z.string().nonempty("請輸入名字"),
      email: z.string().min(1, "請輸入 Email").email("Email 部分格式錯誤"),
      phoneNo: z.string().min(10).nonempty("請輸入電話"),
    }),
  }),
});
