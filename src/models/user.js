import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = models.User || model("User", UserSchema);

export default User;
