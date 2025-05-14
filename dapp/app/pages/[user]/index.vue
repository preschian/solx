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
  <div class="min-h-screen bg-primary-50">
    <UContainer class="py-8">
      <!-- Profile Header -->
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl p-8 shadow-sm border border-primary-100">
          <!-- Profile Image -->
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-3 overflow-hidden">
              <img
                v-if="metadata?.image"
                :src="metadata.image"
                :alt="metadata.name"
                class="w-full h-full object-cover"
              >
              <UIcon
                v-else
                name="i-lucide-user"
                class="text-2xl text-primary-600"
              />
            </div>

            <!-- Profile Info -->
            <h1 class="text-2xl font-bold text-primary-900 mb-2">
              {{ metadata?.fullName }}
            </h1>
            <p v-if="metadata?.description" class="text-primary-600 text-center mb-6 max-w-md">
              {{ metadata?.description }}
            </p>

            <!-- Links -->
            <div v-if="metadata?.links?.length" class="w-full">
              <UButton
                v-for="(link, index) in metadata.links"
                :key="link.value"
                :to="link.value"
                target="_blank"
                block
                color="neutral"
                variant="outline"
                :class="{ 'mb-3': index !== metadata.links.length - 1 }"
                class="py-2"
                :icon="getLinkIcon(link)"
              >
                {{ link.title }}
              </UButton>
            </div>

            <!-- No Links State -->
            <div v-else class="text-center text-primary-500">
              No links added yet
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-4 text-center">
          <p class="text-sm text-primary-500">
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
