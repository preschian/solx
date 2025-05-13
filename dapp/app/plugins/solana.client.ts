import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import SolanaWallets from 'solana-wallets-vue'
import 'solana-wallets-vue/styles.css'

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SolanaWallets, walletOptions)
})
