import { Uploader } from '@irys/upload'
import Solana from '@irys/upload-solana'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  const file = formData?.find(item => item.name === 'file')

  if (!file || !file.data || !file.type) {
    throw createError({
      statusCode: 400,
      message: 'No file provided',
    })
  }

  const { walletSecret } = useRuntimeConfig(event)

  const irysUploader = await Uploader(Solana).withWallet(walletSecret).withRpc('https://api.devnet.solana.com').devnet()
  const fundTx = await irysUploader.fund(irysUploader.utils.toAtomic(3))
  console.log(
    `Successfully funded ${irysUploader.utils.fromAtomic(fundTx.quantity)} ${
      irysUploader.token
    }`,
  )
  const tags = [{ name: 'Content-Type', value: file.type }]
  const upload = await irysUploader.upload(file.data, { tags })

  return { upload, file }
})
