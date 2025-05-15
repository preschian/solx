<script lang="ts" setup>
const route = useRoute()

const { data } = await useFetch('/api/asset', {
  query: {
    slug: route.params.user,
  },
})

const metadata = computed(() => data.value?.metadata)

// Function to determine icon based on link URL
function getLinkIcon(link: { title: string, value: string }) {
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

definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <div class="min-h-screen bg-white flex items-center">
    <UContainer class="py-8 max-w-lg mx-auto">
      <!-- Profile Card -->
      <div class="text-center">
        <!-- Profile Image -->
        <div class="mb-4">
          <div class="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto overflow-hidden">
            <img
              v-if="metadata?.image"
              :src="metadata.image"
              :alt="metadata.name"
              class="w-full h-full object-cover"
            >
            <UIcon
              v-else
              name="i-lucide-user"
              class="text-3xl text-primary-600"
            />
          </div>
        </div>

        <!-- Profile Info -->
        <h1 class="text-2xl font-bold text-primary-900 mb-1">
          {{ metadata?.fullName }}
        </h1>
        <!-- <div class="flex items-center justify-center gap-1 mb-4">
          <span class="text-sm text-primary-500">@{{ metadata?.name }}</span>
          <UIcon name="i-lucide-badge-check" class="text-primary-500 w-4 h-4" />
        </div> -->
        <p v-if="metadata?.description" class="text-primary-600 text-sm mb-8 max-w-md mx-auto">
          {{ metadata?.description }}
        </p>

        <!-- Links -->
        <div v-if="metadata?.links?.length" class="space-y-2.5">
          <UButton
            v-for="link in metadata.links"
            :key="link.value"
            :to="link.value"
            target="_blank"
            block
            color="neutral"
            variant="outline"
            class="py-2.5 h-auto text-sm font-medium"
          >
            <template #leading>
              <UIcon :name="getLinkIcon(link)" class="text-lg" />
            </template>
            <span class="flex-1 text-center">{{ link.title }}</span>
            <template #trailing>
              <UIcon name="i-lucide-external-link" class="text-lg" />
            </template>
          </UButton>
        </div>

        <!-- No Links State -->
        <div v-else class="text-center text-primary-500">
          No links added yet
        </div>

        <!-- Footer -->
        <div class="mt-8">
          <p class="text-xs text-primary-400">
            Powered by
            <a href="/" class="text-primary-600 hover:text-primary-700 font-medium">
              SOLX
            </a>
          </p>
        </div>
      </div>
    </UContainer>
  </div>
</template>
