import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Ensure you're loading the MongoDB URI from the environment variables
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Exit the process if the DB connection fails
  }
};

export default connectDB;
