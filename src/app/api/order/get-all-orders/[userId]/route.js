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
      const { userId } = context.params;
      if (!userId) {
        return NextResponse.json({
          success: false,
          message: "Please Login First",
        });
      }
      const allOrders = await Order.find({ user: userId }).populate({
        path: "orderItems.product",
        model: Products,
      });
      if (allOrders) {
        return NextResponse.json({
          success: true,
          data: allOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No orders Found",
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
