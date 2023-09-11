import mongoose from "mongoose";

const connectionUrl =
  "mongodb+srv://admin:admin123@nextjs-ecommerce-2023.mlvif2f.mongodb.net/";
const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(connectionUrl);
    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
export default connectMongo;
