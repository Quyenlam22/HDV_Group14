const { type } = require("express/lib/response");
const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: String,
    oldPrice: Number,
    discountPercent: Number,
    description: String,
    category: String,
    image: String,
    brand: String,
    position: Number,
    status: String,
    deleted: {
      type: Boolean,
      default: false
    }
  });
const Product = mongoose.model('Product', productSchema, "smartphones");

module.exports = Product