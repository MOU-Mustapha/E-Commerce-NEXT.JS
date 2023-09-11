import connectMongo from "../../../../../database/connectMongo";
import { NextResponse } from "next/server";
import Cart from "../../../../../models/cart";
import AuthUser from "../../../../../middelware/AuthUser";
import Products from "../../../../../models/product";

export const dynamic = "force-dynamic";

export async function GET(req, context) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user) {
      const { userId } = context.params;
      if (!userId) {
        return NextResponse.json({
          success: false,
          message: "Please Login First",
        });
      }
      const cartItems = await Cart.find({ userId }).populate({
        path: "productId",
        model: Products,
      });
      if (cartItems) {
        return NextResponse.json({
          success: true,
          data: cartItems,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No Cart Items Found",
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
