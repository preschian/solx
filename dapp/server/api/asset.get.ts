import { fetchAssetsByCollection } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { Redis } from '@upstash/redis'

interface Metadata {
  name?: string
  description?: string
  fullName?: string
  image?: string
  links?: {
    title: string
    value: string
  }[]
  owner?: string
  assetId?: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { kvRestApiUrl, kvRestApiToken } = useRuntimeConfig(event)

  const redis = new Redis({
    url: kvRestApiUrl,
    token: kvRestApiToken,
  })

  if (query.slug) {
    const user = (await redis.get(`slug:${query.slug}`)) as Metadata | undefined

    if (user?.owner) {
      await redis.hincrby(user.owner, 'views', 1)
    }

    if (user) {
      return { query, metadata: user }
    }
  }

  const user = (await redis.get(`user:${query.owner}`)) as Metadata | undefined
  if (user?.assetId) {
    return { query, metadata: user }
  }

  const umi = createUmi('https://api.devnet.solana.com')
  const collection = publicKey('8P1iwLHdhWCTzCopPSENjHX7cF4eeuFADmzJRVSWjAkm')

  const assetsByCollection = await fetchAssetsByCollection(umi, collection, {
    skipDerivePlugins: false,
  })

  const assets = assetsByCollection.find(asset => asset.owner === query.owner)
  if (!assets) {
    return { query, asset: null, metadata: null }
  }

  let metadata: Metadata | null = null
  if (assets?.uri) {
    const data = await fetch(assets?.uri)
    metadata = await data.json()
  }

  return { query, metadata }
})
