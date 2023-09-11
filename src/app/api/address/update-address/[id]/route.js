import connectMongo from "../../../../../database/connectMongo";
import { NextResponse } from "next/server";
import AuthUser from "../../../../../middelware/AuthUser";
import Address from "../../../../../models/address";

export const dynamic = "force-dynamic";

export async function PUT(req, context) {
  try {
    const user = await AuthUser(req);
    if (user) {
      const { fullName, address, city, country, postalCode } = await req.json();
      const { id } = context.params;
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Please Login First",
        });
      }
      const updatedAddress = await Address.findByIdAndUpdate(id, {
        fullName,
        address,
        city,
        country,
        postalCode,
      });
      if (updatedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update the Address",
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
