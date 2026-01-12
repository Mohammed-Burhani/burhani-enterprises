import { getBrands } from '@/lib/sanity'
import CataloguesClient from './catalogues-client'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Catalogues = async () => {
  const brands = await getBrands()

  return <CataloguesClient brands={brands} />
}

export default Catalogues