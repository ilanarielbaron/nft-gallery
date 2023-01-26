export const parseResponse = (response: any[]): NFT[] =>
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
