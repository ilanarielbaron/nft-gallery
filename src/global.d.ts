interface Wallet {
  isConnected: boolean
  chainId?: string
  address?: string
  id?: string
}

interface NFT {
  id: string
  title: string
  description: string
  imageURL: string
  isLiked: boolean
}

interface API {
  isLoading: boolean;
  errorMessage?: string
}

interface User {
  address: string
  chainId: string
  id: string
  nftsLiked: string[]
  isConnected: boolean
} 
