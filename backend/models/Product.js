import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true }, // URL or path to image
  category: { type: String, enum: ["furniture", "lamps", "home-decor"], required: true },
});

export default mongoose.model("Product", productSchema);