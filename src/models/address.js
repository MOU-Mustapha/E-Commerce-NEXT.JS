import { Schema, model, models } from "mongoose";
import User from "./user";

const AddressSchema = new Schema({
  fullName: String,
  address: String,
  city: String,
  country: String,
  postalCode: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
});

const Address = models.Address || model("Address", AddressSchema);

export default Address;
