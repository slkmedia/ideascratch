import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let connection;

export default async function getConnection() {
  if (!connection) {
    connection = await mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });
  }

  return connection;
}
