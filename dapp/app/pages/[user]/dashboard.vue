<script lang="ts" setup>
interface Link {
  title: string
  value: string
}

const profile = reactive({
  name: '',
  fullName: '',
  description: '',
  image: '',
  links: [] as Link[],
})

// Add username validation and sanitization
const usernameError = ref('')

// Watch username changes and validate
watch(() => profile.name, (newValue) => {
  // Sanitize the username
  const sanitized = sanitizeUsername(newValue)
  if (sanitized !== newValue)
    profile.name = sanitized

  // Validate the username
  usernameError.value = validateUsername(sanitized)
})

const newLink = reactive({
  title: '',
  value: '',
})

const editingLink = reactive({
  index: -1,
  title: '',
  value: '',
})

const openEditProfile = ref(false)
const openAddLink = ref(false)
const openEditLink = ref(false)

const imagePreview = ref('')
const isUploading = ref(false)

const isUpdating = ref(false)
const showStatusModal = ref(false)
const updateStatus = reactive({
  success: false,
  message: '',
  title: '',
})

function removeLink(index: number) {
  profile.links = profile.links.filter((_, i) => i !== index)
}

function editLink(index: number) {
  const link = profile.links[index]
  if (!link)
    return

  editingLink.index = index
  editingLink.title = link.title
  editingLink.value = link.value
  openEditLink.value = true
}

function updateLink() {
  if (editingLink.index === -1)
    return

  profile.links = profile.links.map((link, index) =>
    index === editingLink.index
      ? { title: editingLink.title, value: editingLink.value }
      : link,
  )

  editingLink.index = -1
  editingLink.title = ''
  editingLink.value = ''
  openEditLink.value = false
}

const route = useRoute()

const { data, refresh } = await useLazyFetch('/api/asset', {
  query: {
    owner: route.params.user,
  },
})

const hasProfileChanges = computed(() => {
  if (!data.value?.metadata)
    return false

  return (
    profile.name !== data.value.metadata.name
    || profile.fullName !== data.value.metadata.fullName
    || profile.description !== data.value.metadata.description
    || profile.image !== data.value.metadata.image
    || JSON.stringify(toRaw(profile.links)) !== JSON.stringify(data.value.metadata.links)
  )
})

const profileCompletion = computed(() => {
  const metadata = data.value?.metadata

  const tasks = [
    Boolean(metadata?.image),
    Boolean(metadata?.name) && Boolean(metadata?.fullName) && Boolean(metadata?.description),
    (metadata?.links?.length || 0) > 0,
  ]

  const completedCount = tasks.filter(Boolean).length
  const percentage = Math.round((completedCount / tasks.length) * 100)

  return {
    percentage,
    tasks,
  }
})

async function updateProfile() {
  if (isUpdating.value)
    return

  try {
    isUpdating.value = true
    showStatusModal.value = true
    updateStatus.title = 'Updating Profile'
    updateStatus.message = 'Please wait while we process your changes...'
    updateStatus.success = false

    await $fetch('/api/asset', {
      method: data.value?.metadata?.assetId ? 'PATCH' : 'POST',
      body: {
        ...profile,
        owner: route.params.user,
        assetId: data.value?.metadata?.assetId,
      },
    })

    // Refresh data to update hasProfileChanges
    await refresh()

    updateStatus.title = 'Update Successful'
    updateStatus.message = 'Your profile update has been submitted. Please wait a few seconds and reload the page to see the changes.'
    updateStatus.success = true
    openEditProfile.value = false
  }
  catch (error) {
    console.error('Failed to update profile:', error)
    updateStatus.title = 'Update Failed'
    updateStatus.message = `We encountered an error while saving your changes. Please try again or check your wallet connection. ${error}`
    updateStatus.success = false
  }
  finally {
    isUpdating.value = false
  }
}

watchEffect(() => {
  if (!data?.value?.metadata)
    return

  const metadata = data.value.metadata
  profile.name = metadata.name ?? ''
  profile.fullName = metadata.fullName ?? ''
  profile.description = metadata.description ?? ''
  profile.image = metadata.image ?? ''
  profile.links = metadata.links ?? []
})

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  try {
    isUploading.value = true
    // Create preview URL
    imagePreview.value = URL.createObjectURL(file)

    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })

    console.log('Upload response:', response)

    if (response && response.upload && response.upload.id) {
      console.log(`https://gateway.irys.xyz/${response.upload.id}`)
      profile.image = `https://gateway.irys.xyz/${response.upload.id}`
      target.value = ''
    }
    else {
      console.warn('Upload response did not contain an ID or was unexpected:', response)
    }
  }
  catch (error) {
    console.error('Failed to upload image:', error)
    // Clear preview on error
    imagePreview.value = ''
  }
  finally {
    isUploading.value = false
  }
}

// Cleanup preview URL when component is unmounted
onBeforeUnmount(() => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
})

function reloadPage() {
  window.location.reload()
}
</script>

<template>
  <UContainer class="mt-8">
    <!-- Profile Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Profile Info -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-primary-100">
        <div class="flex flex-col items-center text-center">
          <div class="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-4 overflow-hidden">
            <img
              v-if="data?.metadata?.image"
              :src="data?.metadata?.image"
              :alt="data?.metadata?.name || 'Profile'"
              class="w-full h-full object-cover"
            >
            <UIcon
              v-else
              name="i-lucide-user"
              class="text-3xl text-primary-600"
            />
          </div>
          <h1 class="text-xl font-bold mb-3 text-primary-900 flex items-center justify-center gap-2">
            {{ data?.metadata?.fullName || 'Your Profile' }}
            <UButton
              v-if="data?.metadata?.name"
              color="primary"
              variant="solid"
              icon="i-lucide-eye"
              :to="`/${data.metadata.name}`"
              size="xs"
              target="_blank"
            />
          </h1>
          <p class="text-primary-700 mb-4">
            {{ data?.metadata?.description || 'Manage your profile information and appearance' }}
          </p>
          <div class="flex gap-4 w-full">
            <UModal v-model:open="openEditProfile" :dismissible="false" title="Edit Profile">
              <UButton color="primary" variant="outline" icon="i-lucide-edit" class="flex-1 justify-center">
                Edit Profile
              </UButton>

              <template #body>
                <div class="flex flex-col gap-2">
                  <UFormField label="Profile Photo">
                    <div class="space-y-4">
                      <UInput type="file" accept="image/*" @change="handleFileChange" />
                      <div v-if="imagePreview || data?.metadata?.image" class="w-32 h-32 mx-auto rounded-full overflow-hidden">
                        <img :src="imagePreview || data?.metadata?.image" alt="Profile preview" class="w-full h-full object-cover">
                      </div>
                    </div>
                  </UFormField>
                  <UFormField label="Username">
                    <div class="space-y-1">
                      <UInput
                        v-model="profile.name"
                        class="w-full"
                        :color="usernameError ? 'error' : undefined"
                        placeholder="your-username"
                        maxlength="30"
                        :disabled="Boolean(data?.metadata?.name?.length)"
                      />
                      <p v-if="usernameError" class="text-xs text-red-500">
                        {{ usernameError }}
                      </p>
                      <p class="text-xs text-gray-500">
                        This will be your profile URL: <span class="font-bold">solx.im/{{ profile.name }}</span>
                      </p>
                      <p v-if="data?.metadata?.name" class="text-xs text-amber-600">
                        <UIcon name="i-lucide-info" class="inline-block w-3 h-3 mr-1" />
                        Username changes are not supported in this alpha version
                      </p>
                    </div>
                  </UFormField>
                  <UFormField label="Name">
                    <UInput v-model="profile.fullName" class="w-full" />
                  </UFormField>
                  <UFormField label="Bio">
                    <UTextarea v-model="profile.description" class="w-full" />
                  </UFormField>
                </div>
              </template>

              <template #footer>
                <div class="flex justify-end gap-2">
                  <UButton
                    color="neutral"
                    variant="soft"
                    :disabled="isUploading"
                    @click="openEditProfile = false"
                  >
                    Cancel
                  </UButton>
                  <UButton
                    color="primary"
                    :loading="isUploading"
                    :disabled="isUploading"
                    @click="updateProfile"
                  >
                    {{ isUploading ? 'Uploading Image...' : 'Save Changes' }}
                  </UButton>
                </div>
              </template>
            </UModal>

            <UButton
              v-if="data?.metadata?.assetId"
              color="primary"
              variant="soft"
              icon="i-lucide-external-link"
              :to="`https://core.metaplex.com/explorer/${data.metadata.assetId}?env=devnet`"
              target="_blank"
              class="flex-1 justify-center"
            >
              View On-chain
            </UButton>
          </div>

          <UButton
            v-if="hasProfileChanges"
            block
            color="primary"
            :icon="isUpdating ? 'i-lucide-loader-2' : 'i-lucide-save'"
            :loading="isUpdating"
            :disabled="isUpdating"
            class="mt-4"
            @click="updateProfile"
          >
            {{ isUpdating ? 'Updating...' : 'Update Profile' }}
          </UButton>
        </div>
      </div>

      <!-- Profile Stats -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-primary-100">
        <h2 class="text-lg font-semibold mb-4 text-primary-900">
          Profile Stats
        </h2>
        <div class="flex flex-col gap-4">
          <!-- Total Views -->
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-eye" class="text-lg text-primary-600" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm text-primary-700">Total Views</span>
                <span class="font-semibold text-primary-900">0</span>
              </div>
              <div class="text-xs text-primary-600 flex items-center gap-1">
                <UIcon name="i-lucide-trending-up" class="text-green-500" />
                <span>No data yet</span>
              </div>
            </div>
          </div>

          <!-- Total Clicks -->
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-mouse-pointer" class="text-lg text-primary-600" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm text-primary-700">Total Clicks</span>
                <span class="font-semibold text-primary-900">0</span>
              </div>
              <div class="text-xs text-primary-600 flex items-center gap-1">
                <UIcon name="i-lucide-trending-up" class="text-green-500" />
                <span>No data yet</span>
              </div>
            </div>
          </div>

          <!-- Active Links -->
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-link" class="text-lg text-primary-600" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm text-primary-700">Active Links</span>
                <span class="font-semibold text-primary-900">0</span>
              </div>
              <div class="text-xs text-primary-600">
                Add links to get started
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Completion Status -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-primary-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-primary-900">
            Profile Status
          </h2>
          <div class="text-sm font-medium text-primary-600">
            {{ profileCompletion.percentage }}% Complete
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-2 bg-primary-100 rounded-full mb-6">
          <div
            class="h-2 bg-primary-600 rounded-full transition-all duration-300"
            :style="{ width: `${profileCompletion.percentage}%` }"
          />
        </div>

        <!-- Completion Tasks -->
        <div class="space-y-4">
          <!-- Add Profile Photo -->
          <div class="flex items-center gap-3">
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              :class="profileCompletion.tasks[0] ? 'border-success-600' : 'border-primary-200'"
            >
              <UIcon
                :name="profileCompletion.tasks[0] ? 'i-lucide-check' : 'i-lucide-plus'"
                :class="profileCompletion.tasks[0] ? 'text-xs text-success-600' : 'text-xs text-primary-400'"
              />
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-primary-900">
                Add Profile Photo
              </div>
              <div class="text-xs text-primary-600">
                Make your profile more personal
              </div>
            </div>
            <UButton
              v-if="!profileCompletion.tasks[0]"
              color="primary"
              variant="soft"
              size="xs"
              icon="i-lucide-image"
            >
              Add
            </UButton>
          </div>

          <!-- Add Basic Info -->
          <div class="flex items-center gap-3">
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              :class="profileCompletion.tasks[1] ? 'border-success-600' : 'border-primary-200'"
            >
              <UIcon
                :name="profileCompletion.tasks[1] ? 'i-lucide-check' : 'i-lucide-plus'"
                :class="profileCompletion.tasks[1] ? 'text-xs text-success-600' : 'text-xs text-primary-400'"
              />
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-primary-900">
                Add Basic Info
              </div>
              <div class="text-xs text-primary-600">
                Add your slug, name, and bio
              </div>
            </div>
            <UButton
              v-if="!profileCompletion.tasks[1]"
              color="primary"
              variant="soft"
              size="xs"
              icon="i-lucide-edit"
              @click="openEditProfile = true"
            >
              Add
            </UButton>
          </div>

          <!-- Add Links -->
          <div class="flex items-center gap-3">
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              :class="profileCompletion.tasks[2] ? 'border-success-600' : 'border-primary-200'"
            >
              <UIcon
                :name="profileCompletion.tasks[2] ? 'i-lucide-check' : 'i-lucide-plus'"
                :class="profileCompletion.tasks[2] ? 'text-xs text-success-600' : 'text-xs text-primary-400'"
              />
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-primary-900">
                Add Links
              </div>
              <div class="text-xs text-primary-600">
                Connect your social profiles
              </div>
            </div>
            <UButton
              v-if="!profileCompletion.tasks[2]"
              color="primary"
              variant="soft"
              size="xs"
              icon="i-lucide-link"
              @click="openAddLink = true"
            >
              Add
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Links Management -->
    <div class="bg-white rounded-xl shadow-sm border border-primary-100 mt-8 mb-8">
      <div class="p-4 border-b border-primary-100">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-primary-900">
            Your Links
          </h2>
          <UModal v-model:open="openAddLink" title="Add New Link">
            <UButton color="primary" icon="i-lucide-plus">
              Add New Link
            </UButton>

            <template #body>
              <div class="flex flex-col gap-4">
                <UFormField label="Title">
                  <UInput v-model="newLink.title" placeholder="e.g., My Website" class="w-full" />
                </UFormField>
                <UFormField label="URL">
                  <UInput v-model="newLink.value" placeholder="https://example.com" class="w-full" />
                </UFormField>
              </div>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="soft" @click="openAddLink = false">
                  Cancel
                </UButton>
                <UButton
                  color="primary"
                  @click="() => {
                    profile.links = [...profile.links, { ...newLink }];
                    newLink.title = '';
                    newLink.value = '';
                    openAddLink = false;
                  }"
                >
                  Add Link
                </UButton>
              </div>
            </template>
          </UModal>
        </div>
      </div>

      <!-- Links List -->
      <div class="p-4">
        <!-- Empty State -->
        <div v-if="profile.links.length === 0" class="p-12 text-center">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
            <UIcon name="i-lucide-link" class="text-2xl text-primary-600" />
          </div>
          <h3 class="text-lg font-semibold mb-3 text-primary-900">
            No Links Yet
          </h3>
          <p class="text-primary-700 mb-6">
            Add your first link to start building your profile
          </p>
          <UButton color="primary" icon="i-lucide-plus" @click="openAddLink = true">
            Add Your First Link
          </UButton>
        </div>

        <!-- Link Items -->
        <div v-else class="space-y-2">
          <div v-for="(link, index) in profile.links" :key="index" class="p-2 flex items-center gap-4 hover:bg-primary-50">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-globe" class="text-lg text-primary-600" />
            </div>
            <div class="flex-1 truncate">
              <div class="font-medium text-primary-900">
                {{ link.title }}
              </div>
              <div class="text-sm text-primary-700">
                {{ link.value }}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                color="primary"
                variant="soft"
                icon="i-lucide-edit"
                size="sm"
                @click="editLink(index)"
              />
              <UButton
                color="primary"
                variant="soft"
                icon="i-lucide-trash"
                size="sm"
                @click="removeLink(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Link Modal -->
    <UModal v-model:open="openEditLink" title="Edit Link">
      <template #body>
        <div class="flex flex-col gap-4">
          <UFormField label="Title">
            <UInput v-model="editingLink.title" placeholder="e.g., My Website" class="w-full" />
          </UFormField>
          <UFormField label="URL">
            <UInput v-model="editingLink.value" placeholder="https://example.com" class="w-full" />
          </UFormField>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="soft" @click="openEditLink = false">
            Cancel
          </UButton>
          <UButton
            color="primary"
            @click="updateLink"
          >
            Save Changes
          </UButton>
        </div>
      </template>
    </UModal>
  </UContainer>

  <!-- Status Modal -->
  <UModal v-model:open="showStatusModal" :dismissible="!isUpdating">
    <template #content>
      <div class="p-6 sm:p-8">
        <div
          class="mx-auto flex h-12 w-12 items-center justify-center rounded-full" :class="{
            'bg-primary-50': isUpdating,
            'bg-success-50': !isUpdating && updateStatus.success,
            'bg-error-50': !isUpdating && !updateStatus.success,
          }"
        >
          <UIcon
            v-if="isUpdating"
            name="i-lucide-loader-2"
            class="h-6 w-6 animate-spin text-primary-500"
          />
          <UIcon
            v-else-if="updateStatus.success"
            name="i-lucide-check"
            class="h-6 w-6 text-success-500"
          />
          <UIcon
            v-else
            name="i-lucide-alert-circle"
            class="h-6 w-6 text-error-500"
          />
        </div>

        <div class="mt-4 text-center sm:mt-5">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ updateStatus.title }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ updateStatus.message }}
            </p>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-3">
          <UButton
            v-if="!updateStatus.success"
            color="neutral"
            variant="soft"
            :disabled="isUpdating"
            @click="showStatusModal = false"
          >
            Cancel
          </UButton>
          <UButton
            v-if="!isUpdating && !updateStatus.success"
            color="primary"
            @click="updateProfile"
          >
            Try Again
          </UButton>
          <UButton
            v-if="updateStatus.success"
            color="primary"
            @click="reloadPage"
          >
            Reload Page
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
