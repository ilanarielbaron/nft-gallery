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
