import { parseResponse } from './utils';

interface GetNFTsAlkemy {
  error?: string
  nfts?: NFT[]
}

const chainIds: Record<string, string> = {
	'0x1': 'eth-mainnet',
	'0x3': 'eth-ropsten',
	'0x4': 'eth-rinkeby',
	'0x5': 'eth-goerli',
};

export const getNFTsAlkemy = async (address: string): Promise<GetNFTsAlkemy> => {
	//@ts-expect-error out of typescript scope
	const chainId = window.ethereum.chainId;
	const api_key = 'ps5CP8tz3y5oTzMDqwi90FjMjgM-Fe7d';
	const chain = chainIds[chainId];
	const baseURL = `https://${chain}.g.alchemy.com/v2/${api_key}/getNFTs/`;
	const requestOptions = {
		method: 'GET',
	};
	const fetchURL = `${baseURL}?owner=${address}`;

	try {
		const response = await fetch(fetchURL, requestOptions).then((data) => data.json());
		if (response?.ownedNfts) {
			const parsedNfts = parseResponse(response.ownedNfts);
			return { nfts: parsedNfts };
		}

		return { error: 'There was an error when fetching the NFTs' };
	} catch (err) {
		return { error: err as string };
	}
};
