import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Voucher from "../../../models/Voucher";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { code } = await request.json();

    const voucher = await Voucher.findOne({ code });

    if (!voucher) {
      return NextResponse.json(
        { message: "Voucher not found" },
        { status: 404 }
      );
    }

    voucher.isActive = false;
    await voucher.save();

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
