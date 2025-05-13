<script setup>
// Add your script logic here
</script>

<template>
  <div class="min-h-screen bg-primary-50">
    <!-- Top Navigation -->
    <div class="bg-white border-b border-primary-100">
      <UContainer class="py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="text-2xl font-bold text-primary">
              SOLX
            </NuxtLink>
            <div class="text-sm text-primary-700">
              Dashboard
            </div>
          </div>
          <div class="flex items-center gap-4">
            <UButton color="primary" variant="soft" icon="i-lucide-share-2">
              Share
            </UButton>
            <UButton color="primary" variant="soft" icon="i-lucide-qr-code">
              QR Code
            </UButton>
            <UButton color="primary" icon="i-lucide-user">
              Profile
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

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
              <UButton color="primary" variant="soft" icon="i-lucide-edit">
                Edit Profile
              </UButton>
              <UButton color="primary" variant="soft" icon="i-lucide-image">
                Change Avatar
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
              25% Complete
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-2 bg-primary-100 rounded-full mb-6">
            <div class="h-2 bg-primary-600 rounded-full" style="width: 25%" />
          </div>

          <!-- Completion Tasks -->
          <div class="space-y-4">
            <!-- Add Profile Photo -->
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 border-primary-600 flex items-center justify-center">
                <UIcon name="i-lucide-check" class="text-xs text-primary-600" />
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium text-primary-900">
                  Add Profile Photo
                </div>
                <div class="text-xs text-primary-600">
                  Make your profile more personal
                </div>
              </div>
              <UButton color="primary" variant="soft" size="xs" icon="i-lucide-image">
                Add
              </UButton>
            </div>

            <!-- Add Bio -->
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 border-primary-200 flex items-center justify-center">
                <UIcon name="i-lucide-plus" class="text-xs text-primary-400" />
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium text-primary-900">
                  Add Bio
                </div>
                <div class="text-xs text-primary-600">
                  Tell others about yourself
                </div>
              </div>
              <UButton color="primary" variant="soft" size="xs" icon="i-lucide-edit">
                Add
              </UButton>
            </div>

            <!-- Add Links -->
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 border-primary-200 flex items-center justify-center">
                <UIcon name="i-lucide-plus" class="text-xs text-primary-400" />
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium text-primary-900">
                  Add Links
                </div>
                <div class="text-xs text-primary-600">
                  Connect your social profiles
                </div>
              </div>
              <UButton color="primary" variant="soft" size="xs" icon="i-lucide-link">
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
            <UButton color="primary" icon="i-lucide-plus">
              Add New Link
            </UButton>
          </div>
        </div>

        <!-- Links List -->
        <div class="p-4">
          <!-- Empty State -->
          <div class="p-12 text-center">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <UIcon name="i-lucide-link" class="text-2xl text-primary-600" />
            </div>
            <h3 class="text-lg font-semibold mb-3 text-primary-900">
              No Links Yet
            </h3>
            <p class="text-primary-700 mb-6">
              Add your first link to start building your profile
            </p>
            <UButton color="primary" icon="i-lucide-plus">
              Add Your First Link
            </UButton>
          </div>

          <!-- Link Item Template (Hidden until links are added) -->
          <div class="hidden">
            <div class="p-6 flex items-center gap-4 hover:bg-primary-50">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-globe" class="text-lg text-primary-600" />
              </div>
              <div class="flex-1">
                <div class="font-medium text-primary-900">
                  Website
                </div>
                <div class="text-sm text-primary-700">
                  https://example.com
                </div>
              </div>
              <div class="flex items-center gap-2">
                <UButton color="primary" variant="soft" icon="i-lucide-edit" size="sm" />
                <UButton color="primary" variant="soft" icon="i-lucide-trash" size="sm" />
                <UButton color="primary" variant="soft" icon="i-lucide-grip-vertical" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 mt-12">
      <UContainer class="py-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div class="text-center sm:text-left">
            <h3 class="text-white font-bold text-lg mb-2">
              SOLX
            </h3>
            <p class="text-sm max-w-xs">
              The trusted gateway to Web3 organizations and creators on Solana.
            </p>
          </div>
          <div class="flex gap-8">
            <a href="https://github.com" target="_blank" rel="noopener" class="hover:text-white flex items-center gap-2">
              <UIcon name="i-lucide-github" class="text-lg" />
              <span>GitHub</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" class="hover:text-white flex items-center gap-2">
              <UIcon name="i-lucide-twitter" class="text-lg" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-4 pt-4 text-sm text-center">
          <!-- <div class="flex items-center justify-center gap-2 mb-2">
            <UIcon name="i-lucide-network" class="text-primary-500" />
            <span class="text-gray-400">Running on Solana Devnet</span>
          </div> -->
          <p>&copy; {{ new Date().getFullYear() }} SOLX. All rights reserved.</p>
        </div>
      </UContainer>
    </footer>
  </div>
</template>
