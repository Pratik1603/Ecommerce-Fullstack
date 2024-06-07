import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: {
        type: String,
        required: true,
        unique: true,
      },
    imageUrl: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 }
});


const Product = mongoose.model('Product', ProductSchema);

export default Product;