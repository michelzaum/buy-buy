import { z } from "zod";

import { schema } from "./schema";

export type FormData = z.infer<typeof schema>;

export type SelectedProduct = {
  productId: string;
  quantity: number;
  wasAddedByAuthenticatedUser?: boolean;
};

export type UserProduct = {
  productId: string;
  quantity: number;
};
