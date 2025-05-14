import { fetchAssetsByCollection } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

interface Metadata {
  name?: string
  description?: string
  fullName?: string
  image?: string
  links?: {
    title: string
    value: string
  }[]
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const umi = createUmi('https://api.devnet.solana.com')
  const collection = publicKey('8P1iwLHdhWCTzCopPSENjHX7cF4eeuFADmzJRVSWjAkm')

  const assetsByCollection = await fetchAssetsByCollection(umi, collection, {
    skipDerivePlugins: false,
  })

  const assets = assetsByCollection.find(asset => asset.owner === query.owner)
  if (!assets) {
    return { query, asset: null, metadata: null }
  }

  const asset = {
    owner: assets?.owner,
    uri: assets?.uri,
    name: assets?.name,
    id: assets.publicKey,
  }

  let metadata: Metadata | null = null
  if (asset?.uri) {
    const data = await fetch(asset?.uri)
    metadata = await data.json()
  }

  return { query, asset, metadata }
})
