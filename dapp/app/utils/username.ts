export function sanitizeUsername(value: string) {
  // Remove spaces and special characters, convert to lowercase
  return value.toLowerCase()
    .replace(/[^a-z0-9-_]/g, '') // Only allow lowercase letters, numbers, hyphens and underscores
    .replace(/^-+|-+$/g, '') // Remove hyphens from start and end
}

export function validateUsername(value: string) {
  if (!value)
    return 'Username is required'

  if (value.length < 3)
    return 'Username must be at least 3 characters'

  if (value.length > 30)
    return 'Username must be less than 30 characters'

  if (!/^[a-z0-9][a-z0-9-_]*[a-z0-9]$/.test(value))
    return 'Username can only contain letters, numbers, hyphens and underscores'

  return ''
}
