import connectMongo from "../../../../database/connectMongo";
import { NextResponse } from "next/server";
import AuthUser from "../../../../middelware/AuthUser";
import Order from "../../../../models/order";
import Cart from "../../../../models/cart";

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user) {
      const data = await req.json();
      const { user } = data;
      const newOrder = await Order.create(data);
      if (newOrder) {
        await Cart.deleteMany({ userId: user });
        return NextResponse.json({
          success: true,
          message: "Order created successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to create the order",
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
