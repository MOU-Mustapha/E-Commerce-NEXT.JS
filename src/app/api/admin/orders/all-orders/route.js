import { NextResponse } from "next/server";
import connectMongo from "../../../../../database/connectMongo";
import AuthUser from "../../../../../middelware/AuthUser";
import Order from "../../../../../models/order";
import Products from "../../../../../models/product";
import User from "../../../../../models/user";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user.role === "admin") {
      const orders = await Order.find({})
        .populate({
          path: "orderItems.product",
          model: Products,
        })
        .populate({
          path: "user",
          model: User,
        });
      if (orders) {
        return NextResponse.json({
          success: true,
          data: orders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No orders found",
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
