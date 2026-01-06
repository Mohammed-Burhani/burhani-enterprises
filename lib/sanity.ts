import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6qm97z3a',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Set to false to get fresh data without CDN caching
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
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
  `)
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
  `)
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
  `, { category })
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
  `, { id })
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
  `)
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
  `)
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