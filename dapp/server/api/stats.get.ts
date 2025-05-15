import { Redis } from '@upstash/redis'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { kvRestApiUrl, kvRestApiToken } = useRuntimeConfig(event)

  const redis = new Redis({
    url: kvRestApiUrl,
    token: kvRestApiToken,
  })

  // Get all stats for the user
  const stats = await redis.hgetall(query.owner as string) || {}

  // Get all link clicks from the single hash
  const linkClicks = await redis.hgetall(`${query.owner}:link`) || {}

  // Calculate total clicks by summing all link clicks
  const totalClicks = Object.values(linkClicks)
    .map(clicks => Number.parseInt(clicks as string || '0'))
    .reduce((sum, clicks) => sum + clicks, 0)

  return {
    views: Number.parseInt((stats.views as string) || '0'),
    clicks: totalClicks,
  }
})
