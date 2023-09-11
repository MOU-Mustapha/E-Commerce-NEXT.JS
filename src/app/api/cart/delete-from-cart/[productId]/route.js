import connectMongo from "../../../../../database/connectMongo";
import { NextResponse } from "next/server";
import Cart from "../../../../../models/cart";
import AuthUser from "../../../../../middelware/AuthUser";

export const dynamic = "force-dynamic";

export async function DELETE(req, context) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user) {
      const { productId } = context.params;
      if (!productId) {
        return NextResponse.json({
          success: false,
          message: "Cart item id is required",
        });
      }
      const deletedCartItem = await Cart.findByIdAndDelete(productId);
      if (deletedCartItem) {
        return NextResponse.json({
          success: true,
          message: "Cart item deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete cart item",
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
