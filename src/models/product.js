import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const Products = models.Products || model("Products", ProductSchema);

export default Products;
