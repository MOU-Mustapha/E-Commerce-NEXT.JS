import { NextResponse } from "next/server";
import connectMongo from "../../../../../../database/connectMongo";
import AuthUser from "../../../../../../middelware/AuthUser";
import Order from "../../../../../../models/order";

export const dynamic = "force-dynamic";

export async function PUT(req, context) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user?.role === "admin") {
      const data = await req.json();
      const { orderId } = context.params;
      if (!orderId) {
        return NextResponse.json({
          success: false,
          message: "Order id is required",
        });
      }
      const updatedOrder = await Order.findByIdAndUpdate(orderId, data);
      if (updatedOrder) {
        return NextResponse.json({
          success: true,
          message: "Order status updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update the status of the order",
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
