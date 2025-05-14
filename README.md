# SOLX - Your Solana Bridge to Web3 Communities

## Project Overview
SOLX is a comprehensive Web3 platform built on the Solana blockchain that connects communities, organizations, and digital creators. It serves as a centralized hub for Web3 initiatives and networks, allowing users to manage their digital presence through blockchain-based profiles stored as Metaplex Core NFTs.

### Key Features
- **NFT-Based Profiles**: Store profile data as Metaplex Core NFTs on Solana
- **Web3 Integration**: Native integration with Solana wallet and blockchain features
- **Decentralized Storage**: Profile data secured on the Solana blockchain

## Technology Stack
- [Nuxt.js](https://nuxt.com/) - Vue.js Framework for the frontend
- [Solana](https://solana.com/) - Blockchain platform
- [Metaplex](https://www.metaplex.com/) - NFT Standard for profile storage
- [Irys](https://irys.xyz/) - Decentralized storage layer
- TypeScript - For type safety
- TailwindCSS - For styling
- ESLint - For code linting

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- Bun package manager
- Solana Wallet (like Phantom)
- Solana CLI (optional, for development)

### Installation
1. Install dependencies:
```bash
cd dapp
bun install
```

2. Run the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`

> **Note**: The application currently runs on Solana Devnet. Get test SOL from [Solana Faucet](https://faucet.solana.com/)

### Building for Production
```bash
bun run build
```

### Scripts
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 