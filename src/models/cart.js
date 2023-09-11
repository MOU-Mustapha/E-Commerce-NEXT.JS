import { Schema, model, models } from "mongoose";
import User from "./user";
import Products from "./product";

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: Products,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
