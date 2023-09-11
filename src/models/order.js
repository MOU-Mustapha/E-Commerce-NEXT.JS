import { Schema, model, models } from "mongoose";
import User from "./user";
import Products from "./product";

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  orderItems: [
    {
      qty: { type: Number, required: true },
      product: { type: Schema.Types.ObjectId, ref: Products, required: true },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    address: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true, default: "stripe" },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true },
  paidAt: { type: Date, required: true },
  isProcessing: { type: Boolean, required: true },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
