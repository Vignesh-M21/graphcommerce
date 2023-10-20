import { useQuery } from '@graphcommerce/graphql'
import { RecentlyViewedProductsDocument } from '../graphql/RecentlyViewedProducts.gql'

export type useRecentlyViewedSkusProps = { exclude?: string[] }

export function useRecentlyViewedSkus({ exclude }: useRecentlyViewedSkusProps = {}) {
  const { data, loading, previousData } = useQuery(RecentlyViewedProductsDocument)
  let skus = (loading ? previousData : data)?.recentlyViewedProducts?.items || []

  // Filter out excluded products (current product page)
  if (exclude)
    skus = skus.filter(
      (item) =>
        item?.sku &&
        !exclude.includes(item.sku) &&
        item?.parentSku &&
        !exclude.includes(item.parentSku),
    )

  return { skus, loading }
}
