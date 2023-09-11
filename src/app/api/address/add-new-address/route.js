import connectMongo from "../../../../database/connectMongo";
import { NextResponse } from "next/server";
import AuthUser from "../../../../middelware/AuthUser";
import Joi from "joi";
import Address from "../../../../models/address";

const addressSchema = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user) {
      const { fullName, address, city, country, postalCode, userId } =
        await req.json();
      const { error } = addressSchema.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userId,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const newAddress = await Address.create({
        fullName,
        address,
        city,
        country,
        postalCode,
        userId,
      });
      if (newAddress) {
        return NextResponse.json({
          success: true,
          message: "Address added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the Address",
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
