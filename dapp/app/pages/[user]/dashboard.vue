<script lang="ts" setup>
interface Link {
  title: string
  value: string
}

interface ProfileTask {
  title: string
  completed: boolean
}

const profile = reactive({
  name: '',
  fullName: '',
  description: '',
  image: '',
  links: [] as Link[],
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

const { data } = await useLazyFetch('/api/asset', {
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
  const tasks = [
    { completed: Boolean(profile.image), weight: 1 },
    {
      completed: Boolean(profile.name) && Boolean(profile.fullName) && Boolean(profile.description),
      weight: 1,
    },
    { completed: profile.links.length > 0, weight: 1 },
  ]

  const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0)
  const completedWeight = tasks.reduce((sum, task) => sum + (task.completed ? task.weight : 0), 0)
  const percentage = Math.round((completedWeight / totalWeight) * 100)

  const profileTasks: ProfileTask[] = [
    { title: 'Add Profile Photo', completed: tasks[0]?.completed ?? false },
    { title: 'Add Basic Info', completed: tasks[1]?.completed ?? false },
    { title: 'Add Links', completed: tasks[2]?.completed ?? false },
  ]

  return {
    percentage,
    tasks: profileTasks,
  }
})

async function updateProfile() {
  try {
    await $fetch('/api/asset', {
      method: 'PATCH',
      body: {
        ...profile,
        assetId: data.value?.asset?.id,
      },
    })
    openEditProfile.value = false
  }
  catch (error) {
    console.error('Failed to update profile:', error)
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
  }
}
</script>

<template>
  <UContainer class="mt-8">
    <UAlert
      description="This app is currently running on Solana Devnet. Get test SOL from Solana Faucet: https://faucet.solana.com/"
      color="info"
      icon="i-lucide-terminal"
    />
  </UContainer>

  <UContainer class="mt-8">
    <!-- Profile Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Profile Info -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-primary-100">
        <div class="flex flex-col items-center text-center">
          <div class="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            <UIcon name="i-lucide-user" class="text-3xl text-primary-600" />
          </div>
          <h1 class="text-xl font-bold mb-3 text-primary-900">
            Your Profile
          </h1>
          <p class="text-primary-700 mb-4">
            Manage your profile information and appearance
          </p>
          <div class="flex gap-4">
            <UModal v-model:open="openEditProfile" title="Edit Profile">
              <UButton color="primary" variant="soft" icon="i-lucide-edit">
                Edit Profile
              </UButton>

              <template #body>
                <div class="flex flex-col gap-2">
                  <UFormField label="Profile Photo">
                    <UInput type="file" @change="handleFileChange" />
                  </UFormField>
                  <UFormField label="Username">
                    <UInput v-model="profile.name" class="w-full" />
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
                    color="neutral" variant="soft" @click="openEditProfile = false"
                  >
                    Cancel
                  </UButton>
                  <UButton
                    color="primary"
                    @click="openEditProfile = false"
                  >
                    Save Changes
                  </UButton>
                </div>
              </template>
            </UModal>
            <UButton
              v-if="hasProfileChanges"
              color="primary"
              icon="i-lucide-save"
              @click="updateProfile"
            >
              Update Profile
            </UButton>
          </div>
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
              :class="profileCompletion.tasks[0]?.completed ? 'border-primary-600' : 'border-primary-200'"
            >
              <UIcon
                :name="profileCompletion.tasks[0]?.completed ? 'i-lucide-check' : 'i-lucide-plus'"
                :class="profileCompletion.tasks[0]?.completed ? 'text-xs text-primary-600' : 'text-xs text-primary-400'"
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
              v-if="!profileCompletion.tasks[0]?.completed"
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
              :class="profileCompletion.tasks[1]?.completed ? 'border-primary-600' : 'border-primary-200'"
            >
              <UIcon
                :name="profileCompletion.tasks[1]?.completed ? 'i-lucide-check' : 'i-lucide-plus'"
                :class="profileCompletion.tasks[1]?.completed ? 'text-xs text-primary-600' : 'text-xs text-primary-400'"
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
              v-if="!profileCompletion.tasks[1]?.completed"
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
              :class="profileCompletion.tasks[2]?.completed ? 'border-primary-600' : 'border-primary-200'"
            >
              <UIcon
                :name="profileCompletion.tasks[2]?.completed ? 'i-lucide-check' : 'i-lucide-plus'"
                :class="profileCompletion.tasks[2]?.completed ? 'text-xs text-primary-600' : 'text-xs text-primary-400'"
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
              v-if="!profileCompletion.tasks[2]?.completed"
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
            <div class="flex-1">
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
</template>
