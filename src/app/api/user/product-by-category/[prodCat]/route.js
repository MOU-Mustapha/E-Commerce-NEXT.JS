import { NextResponse } from "next/server";
import connectMongo from "../../../../../database/connectMongo";
import Products from "../../../../../models/product";

export const dynamic = "force-dynamic";

export async function GET(req, context) {
  await connectMongo();
  try {
    const { prodCat } = context.params;
    const products = await Products.find({ category: prodCat });
    if (products) {
      return NextResponse.json({
        success: true,
        data: products,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No products found",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong...!",
    });
  }
}
