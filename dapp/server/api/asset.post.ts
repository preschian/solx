import { create, fetchCollection, ruleSet } from '@metaplex-foundation/mpl-core'
import { generateSigner, keypairIdentity, publicKey } from '@metaplex-foundation/umi'
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

  const checkName = await redis.get(`slug:${body.name}`)
  if (checkName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username already exists',
    })
  }

  const umi = createUmi('https://api.devnet.solana.com')
  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(walletSecret as unknown as ArrayBuffer))
  const signer = keypairIdentity(keypair)
  umi.use(signer)
  umi.use(irysUploader())

  const collectionId = publicKey('8P1iwLHdhWCTzCopPSENjHX7cF4eeuFADmzJRVSWjAkm')
  const collection = await fetchCollection(umi, collectionId)

  const mint = generateSigner(umi)
  const data = {
    ...body,
    assetId: mint.publicKey,
  }
  const name = data.name
  const uri = await umi.uploader.uploadJson(data)

  await create(umi, {
    asset: mint,
    collection,
    name,
    uri,
    owner: publicKey(data.owner),
    plugins: [
      {
        type: 'Royalties',
        basisPoints: 500,
        creators: [
          {
            address: keypair.publicKey,
            percentage: 100,
          },
        ],
        ruleSet: ruleSet('None'),
      },
      {
        type: 'PermanentTransferDelegate',
        authority: { type: 'Address', address: keypair.publicKey },
      },
      {
        type: 'PermanentBurnDelegate',
        authority: { type: 'Address', address: keypair.publicKey },
      },
      {
        type: 'PermanentFreezeDelegate',
        frozen: true,
        authority: { type: 'Address', address: keypair.publicKey },
      },
    ],
  }).sendAndConfirm(umi)

  await redis.set(`slug:${data.name}`, data)
  await redis.set(`user:${data.owner}`, data)

  return { data }
})
