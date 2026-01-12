import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Set to false to get fresh data without CDN caching
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  perspective: 'published', // Ensure we get published content
  stega: false, // Disable stega for production
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Product queries
export async function getProducts() {
  return client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      slug,
      description,
      image,
      brand,
      category,
      material,
      price,
      inStock,
      featured,
      specifications
    }
  `, {}, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true] | order(_createdAt desc) {
      _id,
      name,
      slug,
      description,
      image,
      brand,
      category,
      material,
      price,
      inStock,
      featured
    }
  `, {}, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

export async function getProductsByCategory(category: string) {
  return client.fetch(`
    *[_type == "product" && category == $category] | order(_createdAt desc) {
      _id,
      name,
      slug,
      description,
      image,
      brand,
      category,
      material,
      price,
      inStock,
      featured
    }
  `, { category }, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

export async function getProductById(id: string) {
  return client.fetch(`
    *[_type == "product" && _id == $id][0] {
      _id,
      name,
      slug,
      description,
      image,
      brand,
      category,
      material,
      price,
      inStock,
      featured,
      specifications
    }
  `, { id }, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

// Testimonial queries
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] | order(publishedAt desc) {
      _id,
      text,
      author,
      authorTitle,
      company,
      authorImage,
      rating,
      featured,
      industry,
      publishedAt
    }
  `, {}, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

export async function getFeaturedTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && featured == true] | order(publishedAt desc) {
      _id,
      text,
      author,
      authorTitle,
      company,
      authorImage,
      rating,
      featured,
      industry,
      publishedAt
    }
  `, {}, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

// Brand queries
export async function getBrands() {
  return client.fetch(`
    *[_type == "brand"] | order(order asc) {
      _id,
      name,
      slug,
      logo,
      "cataloguePdfs": cataloguePdfs[] {
        title,
        "fileUrl": file.asset->url,
        description
      },
      description,
      categories[] {
        name,
        image
      },
      order
    }
  `, {}, {
    cache: 'no-store', // Disable caching
    next: { revalidate: 0 } // Revalidate immediately
  })
}

// Types
export interface Product {
  _id: string
  name: string
  slug: { current: string }
  description: string
  image: any
  brand: string
  category: string
  material: string
  price?: number
  inStock: boolean
  featured: boolean
  specifications?: Array<{ key: string; value: string }>
}

export interface Testimonial {
  _id: string
  text: string
  author: string
  authorTitle?: string
  company?: string
  authorImage?: any
  rating: number
  featured: boolean
  industry?: string
  publishedAt: string
}

export interface Brand {
  _id: string
  name: string
  slug: { current: string }
  logo: any
  cataloguePdfs?: Array<{
    title: string
    fileUrl: string
    description?: string
  }>
  description?: string
  categories: Array<{
    name: string
    image: any
  }>
  order: number
}