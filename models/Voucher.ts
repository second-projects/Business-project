import mongoose, { Document, Schema } from "mongoose";

export interface IVoucher extends Document {
  code: string;
  isActive: boolean;
  isFirstTime: boolean;
  dateStarted: Date | null;
}

const VoucherSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: false },
  isFirstTime: { type: Boolean, required: true, default: true },
  dateStarted: { type: Date, default: null },
});

export default mongoose.models.Voucher ||
  mongoose.model<IVoucher>("Voucher", VoucherSchema);
