/**
 * Product Categories Configuration
 * 
 * This file defines all product categories for the Alamra Embroidery website.
 * Each category includes metadata, images, and display information.
 * 
 * @file src/data/product-categories.ts
 * @description Product category definitions and image mappings
 * @author Alamra Embroidery Development Team
 * @version 1.0.0
 */

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  images: string[]
  featuredImage: string
  banner: {
    title: string
    subtitle: string
    backgroundImage: string
  }
}

/**
 * All Product Categories
 * 
 * Categories are organized based on the folder structure in /public/
 * Each category contains all images from its respective folder
 */
export const productCategories: ProductCategory[] = [
  {
    id: 'bullion-crests',
    name: 'Bullion Crests',
    slug: 'bullion-crests',
    description: 'Premium hand-embroidered bullion crests with intricate metallic threadwork',
    longDescription: 'Our bullion crests represent the pinnacle of embroidery craftsmanship. Each piece is meticulously hand-embroidered using premium metallic threads, creating stunning three-dimensional effects that catch and reflect light beautifully. These crests are perfect for military insignia, institutional badges, and ceremonial wear.',
    featuredImage: '/bullion_crests/10.jpg',
    images: [
      '/bullion_crests/10.jpg',
      '/bullion_crests/11.jpg',
      '/bullion_crests/12.jpg',
      '/bullion_crests/13.jpg',
      '/bullion_crests/14.jpg',
      '/bullion_crests/15.jpg',
      '/bullion_crests/16.jpg',
      '/bullion_crests/18.jpg',
      '/bullion_crests/19.jpg',
      '/bullion_crests/2.jpg',
      '/bullion_crests/21.jpg',
      '/bullion_crests/24.jpg',
      '/bullion_crests/25.jpg',
      '/bullion_crests/27.jpg',
      '/bullion_crests/28.jpg',
      '/bullion_crests/29.jpg',
      '/bullion_crests/31.jpg',
      '/bullion_crests/32.jpg',
      '/bullion_crests/33.jpg',
      '/bullion_crests/34.jpg',
      '/bullion_crests/35.jpg',
      '/bullion_crests/36.jpg',
      '/bullion_crests/37.jpg',
      '/bullion_crests/38.jpg',
      '/bullion_crests/39.jpg',
      '/bullion_crests/40.jpg',
      '/bullion_crests/41.jpg',
      '/bullion_crests/42.jpg',
      '/bullion_crests/43.jpg',
      '/bullion_crests/45.jpg',
      '/bullion_crests/46.jpg',
      '/bullion_crests/5.jpg',
      '/bullion_crests/52.jpg',
      '/bullion_crests/6.jpg',
      '/bullion_crests/7.jpg',
      '/bullion_crests/8.jpg',
      '/bullion_crests/9.jpg'
    ],
    banner: {
      title: 'Bullion Crests',
      subtitle: 'Premium hand-embroidered metallic threadwork',
      backgroundImage: '/bullion_crests/10.jpg'
    }
  },
  {
    id: 'patches',
    name: 'Embroidered Patches',
    slug: 'patches',
    description: 'Custom embroidered patches for uniforms, organizations, and personal use',
    longDescription: 'Our embroidered patches combine traditional craftsmanship with modern design techniques. Perfect for uniforms, jackets, bags, and promotional items, these patches are built to last with reinforced edges and colorfast threads. Available in various sizes and backing options.',
    featuredImage: '/patches/1.jpg',
    images: [
      '/patches/1.jpg',
      '/patches/17.jpg',
      '/patches/20.jpg',
      '/patches/22.jpg',
      '/patches/23.jpg',
      '/patches/26.jpg',
      '/patches/3.jpg',
      '/patches/30.jpg',
      '/patches/4.jpg',
      '/patches/44.jpg',
      '/patches/47.jpg',
      '/patches/48.jpg',
      '/patches/49.jpg'
    ],
    banner: {
      title: 'Embroidered Patches',
      subtitle: 'Custom patches for every application',
      backgroundImage: '/patches/1.jpg'
    }
  },
  {
    id: 'aiguillette',
    name: 'Aiguillettes',
    slug: 'aiguillette',
    description: 'Traditional military and ceremonial aiguillettes with ornate braided cords',
    longDescription: 'Aiguillettes are ornamental braided cords worn on military and ceremonial uniforms. Our aiguillettes are crafted using traditional techniques with premium materials, featuring intricate braiding patterns and metallic accents that denote rank and ceremonial importance.',
    featuredImage: '/aiguillette/aiguillette.JPG',
    images: [
      '/aiguillette/aiguillette.JPG'
    ],
    banner: {
      title: 'Aiguillettes',
      subtitle: 'Traditional ceremonial braided cords',
      backgroundImage: '/aiguillette/aiguillette.JPG'
    }
  },
  {
    id: 'braids',
    name: 'Military Braids',
    slug: 'braids',
    description: 'Precision-crafted military braids and decorative trim',
    longDescription: 'Our military braids are woven with precision and attention to detail, following traditional patterns and specifications. These decorative elements add distinction to uniforms and ceremonial wear, available in various colors and patterns to match specific requirements.',
    featuredImage: '/braids/Canadianbraid.JPG',
    images: [
      '/braids/Canadianbraid.JPG'
    ],
    banner: {
      title: 'Military Braids',
      subtitle: 'Precision-crafted decorative trim',
      backgroundImage: '/braids/Canadianbraid.JPG'
    }
  },
  {
    id: 'flags',
    name: 'Embroidered Flags',
    slug: 'flags',
    description: 'Custom embroidered flags and banners for ceremonies and display',
    longDescription: 'Our embroidered flags represent the highest quality in ceremonial and display pieces. Each flag is carefully embroidered with precise attention to detail, using colorfast threads and reinforced construction for both indoor and outdoor use.',
    featuredImage: '/flags/50.jpg',
    images: [
      '/flags/50.jpg',
      '/flags/51.jpg'
    ],
    banner: {
      title: 'Embroidered Flags',
      subtitle: 'Ceremonial and display flags',
      backgroundImage: '/flags/50.jpg'
    }
  },
  {
    id: 'banners',
    name: 'Custom Banners',
    slug: 'banners',
    description: 'Professional embroidered banners for events and organizations',
    longDescription: 'Our custom banners combine embroidery with professional finishing to create impressive displays for events, organizations, and ceremonies. Built with durable materials and reinforced construction for long-lasting use.',
    featuredImage: '/banners/1.JPG',
    images: [
      '/banners/1.JPG'
    ],
    banner: {
      title: 'Custom Banners',
      subtitle: 'Professional embroidered displays',
      backgroundImage: '/banners/1.JPG'
    }
  }
]

/**
 * Helper Functions
 */

// Get category by slug
export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
  return productCategories.find(category => category.slug === slug)
}

// Get all category slugs (for static generation)
export const getAllCategorySlugs = (): string[] => {
  return productCategories.map(category => category.slug)
}

// Get featured categories (for homepage)
export const getFeaturedCategories = (limit: number = 3): ProductCategory[] => {
  return productCategories.slice(0, limit)
}