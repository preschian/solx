<template>
  <div class="py-4 shadow">
    <UContainer class="flex justify-between items-center ">
      <NuxtLink to="/" class="text-2xl font-bold">
        SOLT
      </NuxtLink>
      <UButton>Connect Wallet</UButton>
    </UContainer>
  </div>

  <div class="bg-radial from-primary-900 via-primary-800 to-primary-700">
    <UContainer class="py-4">
      <UAlert
        description="This app is currently running on Solana Devnet. Get test SOL from Solana Faucet: https://faucet.solana.com/"
        color="info"
        icon="i-lucide-terminal"
      />
    </UContainer>

    <UContainer class="pb-60 pt-56 max-w-4xl mx-auto text-center">
      <h1 class="text-6xl font-bold mb-8 text-white font-serif">
        Your Solana Bridge to Web3 Communities and Innovators
      </h1>
      <p class="text-2xl text-gray-100 mx-auto mb-4">
        A comprehensive platform that brings together Web3 initiatives, networks, and digital creators, centralizing all your essential resources in one place
      </p>
    </UContainer>
  </div>

  <UContainer class="py-24">
    <div class="grid grid-cols-3 gap-8">
      <div class="bg-primary-900 p-8 rounded-xl">
        <div class="text-2xl font-bold text-white mb-4 font-serif">
          Trusted & Verified
        </div>
        <p class="text-gray-300">
          Each organization is verified and operated by their team to protect your community from malicious accounts.
        </p>
      </div>
      <div class="bg-primary-900 p-8 rounded-xl">
        <div class="text-2xl font-bold text-white mb-4 font-serif">
          Native Web3 Features
        </div>
        <p class="text-gray-300">
          Create new opportunities for user engagement with embedded web3 features directly in your profile.
        </p>
      </div>
      <div class="bg-primary-900 p-8 rounded-xl">
        <div class="text-2xl font-bold text-white mb-4 font-serif">
          Always Growing
        </div>
        <p class="text-gray-300">
          Seamlessly integrate with upcoming products and stay ahead in the Solana ecosystem.
        </p>
      </div>
    </div>
  </UContainer>

  <!-- Metaplex Core Section -->
  <div class="bg-gray-900">
    <UContainer class="py-24">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <UIcon name="i-lucide-database" class="text-3xl text-primary-600" />
        </div>
        <h2 class="text-4xl font-bold mb-6 text-white font-serif">
          Next-Gen NFT Profile Storage
        </h2>
        <p class="text-xl text-gray-300 mb-8">
          Your profile data is securely stored as Metaplex Core NFTs on the Solana blockchain, ensuring true ownership, permanence, and interoperability across the Web3 ecosystem.
        </p>
        <div class="grid grid-cols-3 gap-8 text-center">
          <div>
            <h3 class="text-xl font-bold text-white mb-2">
              True Ownership
            </h3>
            <p class="text-gray-400">
              Your profile data belongs to you, secured by blockchain technology
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white mb-2">
              Decentralized
            </h3>
            <p class="text-gray-400">
              No central authority controls your data or digital identity
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white mb-2">
              Interoperable
            </h3>
            <p class="text-gray-400">
              Seamlessly integrate with other Solana and Metaplex applications
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </div>

  <!-- How it Works Section -->
  <div class="bg-gray-50">
    <UContainer class="py-24">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 font-serif">
          How It Works
        </h2>
        <p class="text-xl text-gray-600">
          Simple steps to get started with SOLT
        </p>
      </div>

      <div class="grid grid-cols-4 gap-8">
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-wallet" class="text-2xl text-primary-600" />
          </div>
          <h3 class="font-bold mb-2">
            Connect Wallet
          </h3>
          <p class="text-gray-600">
            Link your Solana wallet to get started
          </p>
        </div>
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-user" class="text-2xl text-primary-600" />
          </div>
          <h3 class="font-bold mb-2">
            Create Profile
          </h3>
          <p class="text-gray-600">
            Set up your personal or organization profile
          </p>
        </div>
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-link" class="text-2xl text-primary-600" />
          </div>
          <h3 class="font-bold mb-2">
            Add Links
          </h3>
          <p class="text-gray-600">
            Connect your social media and resources
          </p>
        </div>
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-share" class="text-2xl text-primary-600" />
          </div>
          <h3 class="font-bold mb-2">
            Share Profile
          </h3>
          <p class="text-gray-600">
            Share your SOLT profile with the world
          </p>
        </div>
      </div>
    </UContainer>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-900 text-gray-300">
    <UContainer class="py-12">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-white font-bold text-lg mb-2">
            SOLT
          </h3>
          <p class="text-sm max-w-xs">
            The trusted gateway to Web3 organizations and creators on Solana.
          </p>
        </div>
        <!-- <div class="flex gap-8">
          <a href="#" class="hover:text-white">Documentation</a>
          <a href="#" class="hover:text-white">Discord</a>
          <a href="#" class="hover:text-white">Twitter</a>
        </div> -->
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
        <p>&copy; 2024 SOLT. All rights reserved.</p>
      </div>
    </UContainer>
  </footer>
</template>
