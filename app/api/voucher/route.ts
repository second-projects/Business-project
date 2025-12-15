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
        { message: "Voucher does not exist" },
        { status: 404 }
      );
    }

    if (voucher.isActive) {
      return NextResponse.json(
        { message: "Another user is already using this voucher log in" },
        { status: 409 }
      );
    }

    if (voucher.isFirstTime) {
      voucher.dateStarted = new Date();
      voucher.isFirstTime = false;
    }

    voucher.isActive = true;
    await voucher.save();

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
