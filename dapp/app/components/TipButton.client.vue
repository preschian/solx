<script setup>
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
import { computed } from 'vue'

const props = defineProps({
  recipientAddress: {
    type: String,
    required: true,
  },
  recipientName: {
    type: String,
    default: 'this creator',
  },
})

const { publicKey, connected, sendTransaction } = useWallet()
const toast = useToast()

// Computed property to check if the current user is viewing their own profile
const isCurrentUser = computed(() =>
  publicKey.value && publicKey.value.toString() === props.recipientAddress,
)

const showTipModal = ref(false)
const tipAmount = ref(0.1)
const isSendingTip = ref(false)

// Available tip amounts in SOL
const tipOptions = [0.01, 0.05, 0.1, 0.5, 1, 5]

// Function to send tip transaction
async function sendTip() {
  if (!connected || !publicKey.value) {
    toast.add({
      title: 'Wallet not connected',
      description: 'Please connect your wallet to send a tip',
      color: 'warning',
      icon: 'i-lucide-wallet',
    })
    return
  }

  try {
    isSendingTip.value = true

    // Create a transaction to send SOL
    const transaction = new Transaction()

    // Add a transfer instruction to the transaction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey.value,
        toPubkey: new PublicKey(props.recipientAddress),
        lamports: tipAmount.value * LAMPORTS_PER_SOL,
      }),
    )

    // Using a local connection object
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

    // Send the transaction
    const signature = await sendTransaction(transaction, connection)

    // Create a transaction URL for explorer
    const txUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`

    // Log the transaction URL to help with debugging
    console.log('Transaction URL:', txUrl)

    // Show success toast with transaction link
    toast.add({
      title: 'Tip sent successfully!',
      description: `You sent ${tipAmount.value} SOL to ${props.recipientName}`,
      color: 'success',
      icon: 'i-lucide-check-circle',
      actions: [{
        label: 'View Transaction',
        icon: 'i-lucide-external-link',
        onClick: () => {
          // Try both methods to open the URL
          const newWindow = window.open(txUrl, '_blank')
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            // Popup was blocked, fallback to location change
            window.location.href = txUrl
          }
        },
      }],
    })

    // Close the modal after successful transaction
    showTipModal.value = false
  }
  catch (error) {
    console.error('Error sending tip:', error)

    // Show error toast
    toast.add({
      title: 'Transaction failed',
      description: error?.message ? `Error: ${error.message}` : 'Error sending tip',
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  }
  finally {
    isSendingTip.value = false
  }
}
</script>

<template>
  <div v-if="!isCurrentUser" class="flex items-center justify-center flex-wrap gap-2">
    <!-- Tip button always shown -->
    <UButton
      color="primary"
      variant="solid"
      icon="i-lucide-coffee"
      :disabled="!connected"
      @click="connected ? showTipModal = true : null"
    >
      Tip Me
    </UButton>

    <!-- Wallet connection button only shown when not connected -->
    <div v-if="!connected" class="solana-wallet">
      <WalletMultiButton />
    </div>

    <!-- Modal for tipping -->
    <UModal
      v-model:open="showTipModal"
      :title="`Send a tip to ${recipientName}`"
    >
      <!-- Modal body content -->
      <template #body>
        <p class="mb-4">
          Choose an amount to tip:
        </p>

        <!-- Tip amount selection -->
        <div class="grid grid-cols-3 gap-2 mb-4">
          <UButton
            v-for="amount in tipOptions"
            :key="amount"
            variant="soft"
            :color="tipAmount === amount ? 'primary' : 'neutral'"
            class="text-sm"
            @click="tipAmount = amount"
          >
            {{ amount }} SOL
          </UButton>
        </div>

        <!-- Custom amount input -->
        <div class="mb-6">
          <UFormGroup label="Custom amount (SOL)">
            <UInput
              v-model="tipAmount"
              type="number"
              placeholder="0.1"
              min="0.000001"
              step="0.01"
              class="w-full"
            />
          </UFormGroup>
        </div>
      </template>

      <!-- Modal footer with action buttons -->
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="neutral"
            variant="soft"
            @click="showTipModal = false"
          >
            Cancel
          </UButton>
          <UButton
            color="primary"
            :loading="isSendingTip"
            :disabled="isSendingTip || tipAmount <= 0"
            @click="sendTip"
          >
            {{ isSendingTip ? 'Sending...' : `Send ${tipAmount} SOL` }}
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
