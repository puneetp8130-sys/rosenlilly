/**
 * Rosenlilly Database Seed Script
 *
 * Usage: npm run seed
 *
 * This script:
 * 1. Connects to MongoDB
 * 2. Upserts categories (by slug) to avoid duplicates
 * 3. Upserts products (by slug) to avoid duplicates
 * 4. Reports how many records were inserted/updated
 * 5. Closes the connection and exits cleanly
 *
 * Running this script multiple times is safe (idempotent).
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import categoriesSeedData from './categories.seed.js';
import productsSeedData from './products.seed.js';

// Load environment variables from server/.env
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rosenlilly';

async function seed() {
  console.log('Rosenlilly Seed Script');
  console.log('======================\n');

  try {
    // 1. Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.\n');

    // 2. Seed categories
    console.log('Seeding categories...');
    let categoriesInserted = 0;
    let categoriesUpdated = 0;

    for (const categoryData of categoriesSeedData) {
      const result = await Category.findOneAndUpdate(
        { slug: categoryData.slug },
        categoryData,
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );

      // If the document was just created, its createdAt and updatedAt will be very close
      const timeDiff = Math.abs(
        new Date(result.updatedAt) - new Date(result.createdAt)
      );
      if (timeDiff < 1000) {
        categoriesInserted++;
      } else {
        categoriesUpdated++;
      }
    }

    console.log(
      `  Categories: ${categoriesInserted} inserted, ${categoriesUpdated} updated`
    );

    // 3. Seed products
    console.log('Seeding products...');
    let productsInserted = 0;
    let productsUpdated = 0;

    for (const productData of productsSeedData) {
      const result = await Product.findOneAndUpdate(
        { slug: productData.slug },
        productData,
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );

      const timeDiff = Math.abs(
        new Date(result.updatedAt) - new Date(result.createdAt)
      );
      if (timeDiff < 1000) {
        productsInserted++;
      } else {
        productsUpdated++;
      }
    }

    console.log(
      `  Products: ${productsInserted} inserted, ${productsUpdated} updated`
    );

    // 4. Summary
    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();

    console.log('\nSeed complete!');
    console.log(`  Total categories in database: ${totalCategories}`);
    console.log(`  Total products in database: ${totalProducts}`);
  } catch (error) {
    console.error('\nSeed failed:', error.message);
    process.exit(1);
  } finally {
    // 5. Close connection and exit
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
    process.exit(0);
  }
}

seed();
