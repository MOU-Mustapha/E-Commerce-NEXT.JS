import { NextResponse } from "next/server";
import Products from "../../../../../models/product";
import AuthUser from "../../../../../middelware/AuthUser";
import connectMongo from "../../../../../database/connectMongo";

export const dynamic = "force-dynamic";

export async function PUT(req, context) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user?.role === "admin") {
      const {
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = await req.json();
      const { prodId } = context.params;
      if (!prodId) {
        return NextResponse.json({
          success: false,
          message: "Product id is required",
        });
      }
      const updatedProduct = await Products.findByIdAndUpdate(prodId, {
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });
      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update the product",
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
