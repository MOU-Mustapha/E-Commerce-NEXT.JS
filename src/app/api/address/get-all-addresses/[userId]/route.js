import connectMongo from "../../../../../database/connectMongo";
import { NextResponse } from "next/server";
import AuthUser from "../../../../../middelware/AuthUser";
import Address from "../../../../../models/address";

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
      const allAddresses = await Address.find({ userId });
      if (allAddresses) {
        return NextResponse.json({
          success: true,
          data: allAddresses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No Addresses Found",
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
