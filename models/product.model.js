const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    image: String,
    brand: String,
    position: Number,
    status: String,
    deleted: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  });
const Product = mongoose.model('Product', productSchema, "smartphones");

module.exports = Product