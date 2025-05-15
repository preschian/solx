<template>
  <div class="bg-white mt-2">
    <!-- Hero Section -->
    <UContainer class="py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 class="text-5xl sm:text-6xl font-bold mb-6">
            Your Links Hub on Solana
          </h1>
          <p class="text-xl mb-6">
            One link to share all your content, profiles, and resources.
          </p>
          <div class="space-y-3 mb-8">
            <p class="text-gray-700">
              Create a customizable profile that showcases all your links in one place.
            </p>
            <p class="text-gray-700">
              Share social media, websites, NFT collections, and more with your audience.
            </p>
            <p class="text-gray-700">
              Built on Solana and stored as Metaplex Core NFTs for true digital ownership.
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-100 rounded-2xl p-4 flex items-center justify-center">
            <img src="/profile1.png" alt="Profile example" class="w-full rounded-xl shadow-lg">
          </div>
          <div class="bg-gray-100 rounded-2xl p-4 flex items-center justify-center">
            <img src="/profile2.png" alt="Profile example" class="w-full rounded-xl shadow-lg">
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Features Section -->
    <div class="bg-gray-50 py-16">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">
            Blockchain-Powered Link Management
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Unlike traditional link-in-bio tools, SOLX stores your profile as Metaplex Core NFTs on Solana blockchain for enhanced security and ownership.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="text-xl font-bold mb-3">
              Your Links, Your Ownership
            </div>
            <p class="text-gray-600 mb-4">
              All your profile data is stored as Metaplex Core NFTs, giving you true and permanent ownership of your digital identity.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="text-xl font-bold mb-3">
              Web3 Native
            </div>
            <p class="text-gray-600 mb-4">
              Showcase your NFTs, connect to dApps, and integrate with Web3 services alongside your traditional social links.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="text-xl font-bold mb-3">
              Always Accessible
            </div>
            <p class="text-gray-600 mb-4">
              Your link profile remains available even if our service is down, thanks to decentralized storage on Solana.
            </p>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- How it Works Section -->
    <div class="bg-white py-16">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">
            How It Works
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Four simple steps to create your personalized link hub
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-wallet" class="text-xl sm:text-2xl text-primary-600" />
            </div>
            <h3 class="font-bold mb-2">
              Connect Wallet
            </h3>
            <p class="text-gray-600">
              Link your Solana wallet to get started
            </p>
          </div>
          <div class="text-center">
            <div class="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-user" class="text-xl sm:text-2xl text-primary-600" />
            </div>
            <h3 class="font-bold mb-2">
              Create Profile
            </h3>
            <p class="text-gray-600">
              Set up your personal or organization profile
            </p>
          </div>
          <div class="text-center">
            <div class="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-link" class="text-xl sm:text-2xl text-primary-600" />
            </div>
            <h3 class="font-bold mb-2">
              Add Links
            </h3>
            <p class="text-gray-600">
              Connect your social media and resources
            </p>
          </div>
          <div class="text-center">
            <div class="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-share" class="text-xl sm:text-2xl text-primary-600" />
            </div>
            <h3 class="font-bold mb-2">
              Share Profile
            </h3>
            <p class="text-gray-600">
              Share your SOLX profile with the world
            </p>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>
