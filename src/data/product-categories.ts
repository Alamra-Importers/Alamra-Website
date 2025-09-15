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
    featuredImage: '/bullion_crests/10_compressed.webp',
    images: [
      '/bullion_crests/10_compressed.webp',
      '/bullion_crests/11_compressed.webp',
      '/bullion_crests/12_compressed.webp',
      '/bullion_crests/13_compressed.webp',
      '/bullion_crests/14_compressed.webp',
      '/bullion_crests/15_compressed.webp',
      '/bullion_crests/16_compressed.webp',
      '/bullion_crests/18_compressed.webp',
      '/bullion_crests/19_compressed.webp',
      '/bullion_crests/2_compressed.webp',
      '/bullion_crests/21_compressed.webp',
      '/bullion_crests/24_compressed.webp',
      '/bullion_crests/25_compressed.webp',
      '/bullion_crests/27_compressed.webp',
      '/bullion_crests/28_compressed.webp',
      '/bullion_crests/29_compressed.webp',
      '/bullion_crests/31_compressed.webp',
      '/bullion_crests/32_compressed.webp',
      '/bullion_crests/33_compressed.webp',
      '/bullion_crests/34_compressed.webp',
      '/bullion_crests/35_compressed.webp',
      '/bullion_crests/36_compressed.webp',
      '/bullion_crests/37_compressed.webp',
      '/bullion_crests/38_compressed.webp',
      '/bullion_crests/39_compressed.webp',
      '/bullion_crests/40_compressed.webp',
      '/bullion_crests/41_compressed.webp',
      '/bullion_crests/42_compressed.webp',
      '/bullion_crests/43_compressed.webp',
      '/bullion_crests/45_compressed.webp',
      '/bullion_crests/46_compressed.webp',
      '/bullion_crests/5_compressed.webp',
      '/bullion_crests/52_compressed.webp',
      '/bullion_crests/6_compressed.webp',
      '/bullion_crests/7_compressed.webp',
      '/bullion_crests/8_compressed.webp',
      '/bullion_crests/9_compressed.webp'
    ],
    banner: {
      title: 'Bullion Crests',
      subtitle: 'Premium hand-embroidered metallic threadwork',
      backgroundImage: '/bullion_crests/10_compressed.webp'
    }
  },
  {
    id: 'patches',
    name: 'Embroidered Patches',
    slug: 'patches',
    description: 'Custom embroidered patches for uniforms, organizations, and personal use',
    longDescription: 'Our embroidered patches combine traditional craftsmanship with modern design techniques. Perfect for uniforms, jackets, bags, and promotional items, these patches are built to last with reinforced edges and colorfast threads. Available in various sizes and backing options.',
    featuredImage: '/patches/1_compressed.webp',
    images: [
      '/patches/1_compressed.webp',
      '/patches/17_compressed.webp',
      '/patches/20_compressed.webp',
      '/patches/22_compressed.webp',
      '/patches/23_compressed.webp',
      '/patches/26_compressed.webp',
      '/patches/3_compressed.webp',
      '/patches/30_compressed.webp',
      '/patches/4_compressed.webp',
      '/patches/44_compressed.webp',
      '/patches/47_compressed.webp',
      '/patches/48_compressed.webp',
      '/patches/49_compressed.webp'
    ],
    banner: {
      title: 'Embroidered Patches',
      subtitle: 'Custom patches for every application',
      backgroundImage: '/patches/1_compressed.webp'
    }
  },
  {
    id: 'aiguillette',
    name: 'Aiguillettes',
    slug: 'aiguillette',
    description: 'Traditional military and ceremonial aiguillettes with ornate braided cords',
    longDescription: 'Aiguillettes are ornamental braided cords worn on military and ceremonial uniforms. Our aiguillettes are crafted using traditional techniques with premium materials, featuring intricate braiding patterns and metallic accents that denote rank and ceremonial importance.',
    featuredImage: '/aiguillette/aiguillette_compressed.webp',
    images: [
      '/aiguillette/aiguillette_compressed.webp'
    ],
    banner: {
      title: 'Aiguillettes',
      subtitle: 'Traditional ceremonial braided cords',
      backgroundImage: '/aiguillette/aiguillette_compressed.webp'
    }
  },
  {
    id: 'braids',
    name: 'Military Braids',
    slug: 'braids',
    description: 'Precision-crafted military braids and decorative trim',
    longDescription: 'Our military braids are woven with precision and attention to detail, following traditional patterns and specifications. These decorative elements add distinction to uniforms and ceremonial wear, available in various colors and patterns to match specific requirements.',
    featuredImage: '/braids/Canadianbraid_compressed.webp',
    images: [
      '/braids/Canadianbraid_compressed.webp'
    ],
    banner: {
      title: 'Military Braids',
      subtitle: 'Precision-crafted decorative trim',
      backgroundImage: '/braids/Canadianbraid_compressed.webp'
    }
  },
  {
    id: 'flags',
    name: 'Embroidered Flags',
    slug: 'flags',
    description: 'Custom embroidered flags and banners for ceremonies and display',
    longDescription: 'Our embroidered flags represent the highest quality in ceremonial and display pieces. Each flag is carefully embroidered with precise attention to detail, using colorfast threads and reinforced construction for both indoor and outdoor use.',
    featuredImage: '/flags/50_compressed.webp',
    images: [
      '/flags/50_compressed.webp',
      '/flags/51_compressed.webp'
    ],
    banner: {
      title: 'Embroidered Flags',
      subtitle: 'Ceremonial and display flags',
      backgroundImage: '/flags/50_compressed.webp'
    }
  },
  {
    id: 'banners',
    name: 'Custom Banners',
    slug: 'banners',
    description: 'Professional embroidered banners for events and organizations',
    longDescription: 'Our custom banners combine embroidery with professional finishing to create impressive displays for events, organizations, and ceremonies. Built with durable materials and reinforced construction for long-lasting use.',
    featuredImage: '/banners/1_compressed.webp',
    images: [
      '/banners/1_compressed.webp'
    ],
    banner: {
      title: 'Custom Banners',
      subtitle: 'Professional embroidered displays',
      backgroundImage: '/banners/1_compressed.webp'
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