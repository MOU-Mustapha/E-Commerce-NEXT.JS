import { NextResponse } from "next/server";
import connectMongo from "../../../../database/connectMongo";
import Joi from "joi";
import Products from "../../../../models/product";
import AuthUser from "../../../../middelware/AuthUser";

const addProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectMongo();
  try {
    const user = await AuthUser(req);
    if (user?.role === "admin") {
      const {
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = await req.json();
      const { error } = addProductSchema.validate({
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const product = await Products.create({
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });
      if (product) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the product",
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
