import { NextResponse } from "next/server";
import connectMongo from "../../../../../database/connectMongo";
import Products from "../../../../../models/product";
import AuthUser from "../../../../../middelware/AuthUser";

export const dynamic = "force-dynamic";

export async function DELETE(req, context) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user?.role === "admin") {
      const { prodId } = context.params;
      if (!prodId) {
        return NextResponse.json({
          success: false,
          message: "Product id is required",
        });
      }
      const deletedProduct = await Products.findByIdAndDelete(prodId);
      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete the product",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong...!",
    });
  }
}
