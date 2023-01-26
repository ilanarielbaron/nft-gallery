export const parseResponse = (response: any[]): NFT[] => {
  console.log(response);
  return response.map(nftResponse => ({
    id: nftResponse.id.tokenId,
    description: nftResponse.description,
    imageURL: nftResponse.metadata.image,
    isLiked: false,
    title: nftResponse.title
  } as NFT));
}
