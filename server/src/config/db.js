import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectDb(uri) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed, falling back to in-memory db...");
    try {
      const mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`In-memory MongoDB connected at ${memoryUri}`);
    } catch (memErr) {
      console.error("In-memory MongoDB connection also failed:", memErr.message);
      process.exit(1);
    }
  }
}
