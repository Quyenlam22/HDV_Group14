const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
  title: String,
  product_category_id: {
    type: String,
    default: ""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  sold: Number,
  image: String,
  brand: String,
  position: Number,
  status: String,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});
const Product = mongoose.model('Product', productSchema, "smartphones");

module.exports = Product