export const parseResponse = (
	response: {
    id: { tokenId: string }
    description: string
    metadata: { image: string }
    title: string
  }[],
): NFT[] =>
	response.map(
		(nftResponse) =>
			({
				id: nftResponse.id.tokenId,
				description: nftResponse.description,
				imageURL: nftResponse.metadata.image,
				isLiked: false,
				title: nftResponse.title,
			} as NFT),
	);
