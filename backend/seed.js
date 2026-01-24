require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    const seedData = [
      { name: 'Cheeseburger', price: 12.99, category: 'Main', image: 'https://via.placeholder.com/300x200?text=Burger' },
      { name: 'Margherita Pizza', price: 14.99, category: 'Main', image: 'https://via.placeholder.com/300x200?text=Pizza' },
      { name: 'Caesar Salad', price: 8.99, category: 'Appetizer', image: 'https://via.placeholder.com/300x200?text=Salad' },
    ];

    await MenuItem.deleteMany({}); // Clear existing
    await MenuItem.insertMany(seedData);
    console.log('✅ Menu seeded successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seed error:', error);
    process.exit(1);
  });
