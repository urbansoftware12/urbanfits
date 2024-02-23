const mongoose = require('mongoose');

const ConnectDB = async () => {
  if (mongoose.connections[0].readyState) return console.log("Success! Connection already exists\n");
  mongoose.set('strictQuery', false);
  try {
    console.log("Connecting to the database...\n");
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI + process.env.NEXT_PUBLIC_DB_NAME + "?tls=true");
    console.log("Connected to the MongoDB successfully!\n");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
export const immutableCondition = (doc) => {
  const { _immutability } = doc.options;
  return !(_immutability && _immutability === "disable")
}
export default ConnectDB;