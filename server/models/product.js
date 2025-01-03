const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {  // Ensure description is not required if not needed
    type: String,
    required: false,  // Set to false if description is not mandatory
  },
  price: {
    type: Number,
    required: true,
  },
  sizeQuantity: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: false, // If this is not mandatory
  },
  category: {
    type: String,
    required: true,
  },
  email: {  // If this field is not needed, make it optional or remove it
    type: String,
    required: false,  // Set to false if you don’t need it
  }
});

module.exports = mongoose.model("Product", productSchema);
