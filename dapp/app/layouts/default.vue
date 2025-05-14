<script lang="ts" setup>
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'

const route = useRoute()
// const { publicKey } = useWallet()

const isDashboard = computed(() => route.name === 'user-dashboard')
</script>

<template>
  <!-- Top Navigation -->
  <div class="shadow">
    <UContainer class="py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-2xl font-bold text-primary">
            SOLX
          </NuxtLink>
          <div v-if="isDashboard" class="text-sm text-primary-700">
            Dashboard
          </div>
        </div>
        <div class="flex items-center gap-2">
          <!-- <UButton v-if="isDashboard" color="primary" variant="soft" icon="i-lucide-share-2">
            Share
          </UButton>
          <UButton v-if="isDashboard" color="primary" variant="soft" icon="i-lucide-qr-code">
            QR Code
          </UButton> -->
          <!-- edit profile button -->
          <!-- <UButton v-if="publicKey" color="primary" icon="i-lucide-user" :to="`/${publicKey}/dashboard`">
            Profile
          </UButton> -->

          <ClientOnly>
            <div class="solana-wallet">
              <WalletMultiButton />
            </div>
          </ClientOnly>
        </div>
      </div>
    </UContainer>
  </div>

  <slot />

  <!-- Footer -->
  <footer class="bg-gray-900 text-gray-300">
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
</template>
