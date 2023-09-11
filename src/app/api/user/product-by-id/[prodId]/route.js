import { NextResponse } from "next/server";
import connectMongo from "../../../../../database/connectMongo";
import Products from "../../../../../models/product";

export const dynamic = "force-dynamic";

export async function GET(req, context) {
  await connectMongo();
  try {
    const { prodId } = context.params;
    if (!prodId) {
      return NextResponse.json({
        success: false,
        message: "Product id is required...!",
      });
    }
    const product = await Products.findById(prodId);
    if (product) {
      return NextResponse.json({
        success: true,
        data: product,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong...!",
    });
  }
}
