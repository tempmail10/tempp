const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 7000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/admin';

app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema({
  pid: { type: Number, required: true },
  pname: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  brand: { type: String, required: true, trim: true }
}, { versionKey: false });

const Product = mongoose.model('products', productSchema);

app.get('/getallproducts', async (req, res) => {
  try {
    const products = await Product.find().sort({ pid: 1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/addproduct', async (req, res) => {
  try {
    const { pid, pname, price, brand } = req.body;
    if (!pid || !pname?.trim() || price === undefined || !brand?.trim()) {
      return res.status(400).json({ message: 'All product fields are required' });
    }
    const product = await Product.create({ pid: Number(pid), pname, price: Number(price), brand });
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

mongoose.connect(mongoUrl)
  .then(() => app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)))
  .catch((error) => console.error('MongoDB connection error:', error.message));
