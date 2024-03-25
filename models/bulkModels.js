import mongoose from "mongoose";

// Define a schema for the T-shirt order
const placeOrderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  prize: {
    type: Number,
  },
  tshirtimage: {
    type: String,
  },
  photo: {
    type: String,
  },
  status: {
    type: String,
    default: "Not Process",
    enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
  },
  description: {
    type: String,
  },
});

// Create a model using the schema

export default mongoose.model("Bulkorder", placeOrderSchema);
