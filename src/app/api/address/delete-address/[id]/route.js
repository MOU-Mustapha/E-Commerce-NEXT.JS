import connectMongo from "../../../../../database/connectMongo";
import { NextResponse } from "next/server";
import AuthUser from "../../../../../middelware/AuthUser";
import Address from "../../../../../models/address";

export const dynamic = "force-dynamic";

export async function DELETE(req, context) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user) {
      const { id } = context.params;
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Please Login First",
        });
      }
      const deletedAddress = await Address.findByIdAndDelete(id);
      if (deletedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete the address",
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
