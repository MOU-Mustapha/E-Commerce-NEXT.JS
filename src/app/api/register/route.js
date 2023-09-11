import User from "../../../models/user";
import Joi from "joi";
import { NextResponse } from "next/server";
import connectMongo from "../../../database/connectMongo";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectMongo();
  try {
    const { name, email, password, role } = await req.json();
    const { error } = schema.validate({ name, email, password, role });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message:
          "Account is already exists please try again with different email",
      });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        role,
      });
      if (user) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully",
        });
      }
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong...!",
    });
  }
}
