import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Voucher from "../../../../models/Voucher";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    await dbConnect();
    const { code } = params;

    const voucher = await Voucher.findOne({ code });

    if (!voucher) {
      return NextResponse.json(
        { message: "Voucher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ dateStarted: voucher.dateStarted });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
