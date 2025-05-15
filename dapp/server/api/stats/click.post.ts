import { Redis } from '@upstash/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { kvRestApiUrl, kvRestApiToken } = useRuntimeConfig(event)

  const redis = new Redis({
    url: kvRestApiUrl,
    token: kvRestApiToken,
  })

  // Track clicks in a single hash per user
  const linkKey = `${body.owner}:link`
  await redis.hincrby(linkKey, body.linkId, 1)

  return { success: true }
})
