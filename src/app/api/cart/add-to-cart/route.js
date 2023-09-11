import connectMongo from "../../../../database/connectMongo";
import { NextResponse } from "next/server";
import AuthUser from "../../../../middelware/AuthUser";
import Joi from "joi";
import Cart from "../../../../models/cart";

const addToCartSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user) {
      const { userId, productId } = await req.json();
      const { error } = addToCartSchema.validate({ userId, productId });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const isProductAlreadyInCart = await Cart.find({
        userId,
        productId,
      });
      if (isProductAlreadyInCart.length > 0) {
        return NextResponse.json({
          success: false,
          message: "Product is already added to cart",
        });
      }
      const cartItem = await Cart.create({ userId, productId });
      if (cartItem) {
        return NextResponse.json({
          success: true,
          message: "Product added to cart",
        });
      } else {
        return NextResponse.json({
          success: true,
          message: "Failed to add the product to cart",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized...!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong...!",
    });
  }
}
