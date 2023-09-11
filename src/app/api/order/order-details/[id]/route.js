import connectMongo from "../../../../../database/connectMongo";
import { NextResponse } from "next/server";
import AuthUser from "../../../../../middelware/AuthUser";
import Order from "../../../../../models/order";
import Products from "../../../../../models/product";

export const dynamic = "force-dynamic";

export async function GET(req, context) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user) {
      const { id } = context.params;
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Order id is required",
        });
      }
      const orderDetails = await Order.findById(id).populate({
        path: "orderItems.product",
        model: Products,
      });
      if (orderDetails) {
        return NextResponse.json({
          success: true,
          data: orderDetails,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get order details",
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
