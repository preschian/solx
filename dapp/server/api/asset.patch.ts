import { fetchAsset, fetchCollection, update } from '@metaplex-foundation/mpl-core'
import { keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { Redis } from '@upstash/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { walletSecret, kvRestApiUrl, kvRestApiToken } = useRuntimeConfig(event)

  const redis = new Redis({
    url: kvRestApiUrl,
    token: kvRestApiToken,
  })

  const umi = createUmi('https://api.devnet.solana.com')
  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(walletSecret as unknown as ArrayBuffer))
  const signer = keypairIdentity(keypair)
  umi.use(signer)
  umi.use(irysUploader())

  const assetId = publicKey(body.assetId)
  const asset = await fetchAsset(umi, assetId)

  const collectionId = publicKey('8P1iwLHdhWCTzCopPSENjHX7cF4eeuFADmzJRVSWjAkm')
  const collection = await fetchCollection(umi, collectionId)

  const name = body.name
  const uri = await umi.uploader.uploadJson(body)

  await update(umi, {
    asset,
    collection,
    name,
    uri,
  }).sendAndConfirm(umi)

  const data = {
    ...body,
    owner: asset.owner,
  }

  await redis.set(`slug:${body.name}`, data)
  await redis.hset(asset.owner, {
    metadata: data,
  })

  return { assetId, body }
})
