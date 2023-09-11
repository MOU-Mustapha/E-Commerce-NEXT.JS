import { NextResponse } from "next/server";
import AuthUser from "../../../middelware/AuthUser";

const stripe = require("stripe")(
  "sk_test_51NoblzEXceHzQqK7kCMp0WFHPnSGofr31j8aPKNPrxS38rg2xYMSrmoBvErbcfqLp6a7JOBn30Ga8N0faLWcsMHR00h6OnkUbB"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const user = await AuthUser(req);
    if (user) {
      const res = await req.json();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });
      return NextResponse.json({
        success: true,
        id: session.id,
      });
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
