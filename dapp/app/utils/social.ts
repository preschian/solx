// Function to determine icon based on link URL
export function getLinkIcon(link: { title: string, value: string }) {
  const url = link.value.toLowerCase()

  if (url.includes('twitter.com') || url.includes('x.com'))
    return 'i-lucide-twitter'
  if (url.includes('github.com'))
    return 'i-lucide-github'
  if (url.includes('linkedin.com'))
    return 'i-lucide-linkedin'
  if (url.includes('instagram.com'))
    return 'i-lucide-instagram'
  if (url.includes('youtube.com'))
    return 'i-lucide-youtube'
  if (url.includes('discord.com'))
    return 'i-lucide-message-circle'
  if (url.includes('telegram'))
    return 'i-lucide-send'
  if (url.startsWith('mailto:'))
    return 'i-lucide-mail'

  return 'i-lucide-link'
}
