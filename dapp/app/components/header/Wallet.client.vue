<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'

const { publicKey } = useWallet()
</script>

<template>
  <UButton v-if="publicKey" color="primary" icon="i-lucide-user" :to="`/${publicKey}/dashboard`">
    Profile
  </UButton>
  <div class="solana-wallet">
    <WalletMultiButton />
  </div>
</template>
