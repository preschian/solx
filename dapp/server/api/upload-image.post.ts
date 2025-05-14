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

  const irys = await Uploader(Solana).withWallet(walletSecret).withRpc('https://api.devnet.solana.com').devnet()

  // fund the upload
  try {
    const price = await irys.getPrice(file.data.length * 10)
    await irys.fund(price)
    console.log(`Successfully funded ${irys.utils.fromAtomic(price)} ${irys.token}`)
  }
  catch (error) {
    console.error('Failed to fund upload:', error)
  }

  // upload the file
  const tags = [{ name: 'Content-Type', value: file.type }]
  const upload = await irys.upload(file.data, { tags })

  return { upload, file }
})
