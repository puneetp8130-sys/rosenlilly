/**
 * Product seed data for Rosenlilly.
 * Based on the existing 8-product frontend catalogue in src/data/products.js.
 * Extended with database-specific fields (slug, description, stock, tags, etc.).
 */

const productsSeedData = [
  {
    name: 'Premium Red Roses',
    slug: 'premium-red-roses',
    description:
      'A stunning arrangement of premium red roses, hand-picked for their vibrant colour and long-lasting freshness. Perfect for anniversaries and romantic occasions.',
    category: 'roses',
    categoryName: 'Roses',
    occasions: ['anniversary'],
    offer: false,
    price: 799,
    oldPrice: 999,
    rating: 4.9,
    reviewsCount: 128,
    discount: 20,
    image:
      'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 50,
    isActive: true,
    isFeatured: true,
    tags: ['roses', 'red', 'premium', 'anniversary'],
  },
  {
    name: 'Dreamy Pink Bouquet',
    slug: 'dreamy-pink-bouquet',
    description:
      'A dreamy bouquet of soft pink blooms arranged with lush greenery. Ideal for birthdays and anniversaries.',
    category: 'bouquets',
    categoryName: 'Bouquets',
    occasions: ['birthday', 'anniversary'],
    offer: true,
    price: 899,
    oldPrice: 1199,
    rating: 4.8,
    reviewsCount: 96,
    discount: 25,
    image:
      'https://images.unsplash.com/photo-1523691509543-c55fb32e5cee?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1523691509543-c55fb32e5cee?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 35,
    isActive: true,
    isFeatured: true,
    tags: ['bouquet', 'pink', 'birthday', 'anniversary'],
  },
  {
    name: 'Elegant White Lilies',
    slug: 'elegant-white-lilies',
    description:
      'Graceful white lilies that exude elegance and purity. A timeless choice for anniversaries and special moments.',
    category: 'lilies',
    categoryName: 'Lilies',
    occasions: ['anniversary'],
    offer: true,
    price: 699,
    oldPrice: 899,
    rating: 4.7,
    reviewsCount: 74,
    discount: 22,
    image:
      'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 40,
    isActive: true,
    isFeatured: false,
    tags: ['lilies', 'white', 'elegant', 'anniversary'],
  },
  {
    name: 'Bright Sunflower Basket',
    slug: 'bright-sunflower-basket',
    description:
      'A cheerful basket of bright sunflowers that instantly lifts the mood. A wonderful birthday gift.',
    category: 'sunflowers',
    categoryName: 'Sunflowers',
    occasions: ['birthday'],
    offer: false,
    price: 749,
    oldPrice: 949,
    rating: 4.9,
    reviewsCount: 112,
    discount: 21,
    image:
      'https://images.unsplash.com/photo-1597848212624-e19f5e8f9c95?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1597848212624-e19f5e8f9c95?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 30,
    isActive: true,
    isFeatured: true,
    tags: ['sunflower', 'basket', 'bright', 'birthday'],
  },
  {
    name: 'Purple Orchid Elegance',
    slug: 'purple-orchid-elegance',
    description:
      'Exotic purple orchids presented in an elegant arrangement. A sophisticated choice for anniversaries.',
    category: 'orchids',
    categoryName: 'Orchids',
    occasions: ['anniversary'],
    offer: true,
    price: 999,
    oldPrice: 1299,
    rating: 4.8,
    reviewsCount: 87,
    discount: 23,
    image:
      'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 25,
    isActive: true,
    isFeatured: false,
    tags: ['orchid', 'purple', 'elegant', 'anniversary'],
  },
  {
    name: 'Garden Mixed Flowers',
    slug: 'garden-mixed-flowers',
    description:
      'A vibrant mix of garden-fresh flowers in a lively arrangement. Perfect for birthday celebrations.',
    category: 'mixed-flowers',
    categoryName: 'Mixed Flowers',
    occasions: ['birthday'],
    offer: true,
    price: 849,
    oldPrice: 1099,
    rating: 4.7,
    reviewsCount: 65,
    discount: 23,
    image:
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 45,
    isActive: true,
    isFeatured: false,
    tags: ['mixed', 'garden', 'colourful', 'birthday'],
  },
  {
    name: 'Classic Red Rose Bouquet',
    slug: 'classic-red-rose-bouquet',
    description:
      'A timeless bouquet of classic red roses, beautifully arranged for a grand romantic gesture.',
    category: 'roses',
    categoryName: 'Roses',
    occasions: ['anniversary'],
    offer: false,
    price: 1099,
    oldPrice: 1399,
    rating: 4.9,
    reviewsCount: 154,
    discount: 21,
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 55,
    isActive: true,
    isFeatured: true,
    tags: ['roses', 'red', 'classic', 'bouquet', 'anniversary'],
  },
  {
    name: 'Pastel Flower Bouquet',
    slug: 'pastel-flower-bouquet',
    description:
      'A delicate bouquet of pastel-toned flowers that creates a soft, romantic feel. Lovely for birthdays.',
    category: 'bouquets',
    categoryName: 'Bouquets',
    occasions: ['birthday'],
    offer: false,
    price: 1199,
    oldPrice: 1499,
    rating: 4.8,
    reviewsCount: 103,
    discount: 20,
    image:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85',
    ],
    stock: 38,
    isActive: true,
    isFeatured: false,
    tags: ['bouquet', 'pastel', 'soft', 'birthday'],
  },
];

export default productsSeedData;
