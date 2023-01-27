import { parseResponse } from './utils';

interface GetNFTs {
  error?: string
  nfts?: NFT[]
}

const chainIds: Record<string, string> = {
	'0x1': 'eth-mainnet',
	'0x3': 'eth-ropsten',
	'0x4': 'eth-rinkeby',
	'0x5': 'eth-goerli',
};

//In a real project the API_KEY should be in a .env file
const API_KEY = '63d2fd73a95709597409d029';

export const getNFTsAlkemy = async (address: string): Promise<GetNFTs> => {
	//@ts-expect-error out of typescript scope
	const chainId = window.ethereum.chainId;
	//In a real project the API_KEY should be in a .env file
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

export const getUserConnected = async (): Promise<{
  address: string
  chainId: string
  id: string
  nftsLiked: string[]
  isConnected: boolean
} | null> => {
	const baseURL = 'https://gallery-814b.restdb.io/rest/user-state';
	const requestOptions = {
		method: 'GET',
		headers: {
			'cache-control': 'no-cache',
			'x-apikey': API_KEY,
		},
	};
	const fetchURL = `${baseURL}?q={"isConnected":true}`;
	const response = await fetch(fetchURL, requestOptions).then((data) => data.json());
	if (!response[0]) return null;

	return { ...response[0], ...(response[0]?.['_id'] && { id: response[0]['_id'] }) };
};

export const getUserByAddress = async (
	address: string,
): Promise<{
  address: string
  chainId: string
  id: string
  nftsLiked: string[]
  isConnected: boolean
} | null> => {
	const baseURL = 'https://gallery-814b.restdb.io/rest/user-state';
	const requestOptions = {
		method: 'GET',
		headers: {
			'cache-control': 'no-cache',
			'x-apikey': API_KEY,
		},
	};
	const fetchURL = `${baseURL}?q={"address":"${address}"}`;
	const response = await fetch(fetchURL, requestOptions).then((data) => data.json());
	if (!response[0]) return null;

	return { ...response[0], ...(response[0]?.['_id'] && { id: response[0]['_id'] }) };
};

export const createUser = async (address: string, chainId: string): Promise<string> => {
	const baseURL = 'https://gallery-814b.restdb.io/rest/user-state';
	const requestOptions = {
		method: 'POST',
		headers: {
			'cache-control': 'no-cache',
			'x-apikey': API_KEY,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			address,
			isConnected: true,
			nftsLiked: [],
			chainId,
		}),
	};
	const response = await fetch(baseURL, requestOptions).then((data) => data.json());

	return response['_id'];
};

export const connectUser = async (id: string): Promise<void> => {
	const baseURL = `https://gallery-814b.restdb.io/rest/user-state/${id}`;
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'cache-control': 'no-cache',
			'x-apikey': API_KEY,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			_id: id,
			isConnected: true,
		}),
	};

	const response = await fetch(baseURL, requestOptions).then((data) => data.json());

	return response;
};

export const disconnectUser = async (id: string): Promise<void> => {
	const baseURL = `https://gallery-814b.restdb.io/rest/user-state/${id}`;
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'cache-control': 'no-cache',
			'x-apikey': API_KEY,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			_id: id,
			isConnected: false,
		}),
	};

	const response = await fetch(baseURL, requestOptions).then((data) => data.json());

	return response;
};

export const updateLikes = async (id: string, likes: string[]): Promise<void> => {
	const baseURL = `https://gallery-814b.restdb.io/rest/user-state/${id}`;
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'cache-control': 'no-cache',
			'x-apikey': API_KEY,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			_id: id,
			nftsLiked: likes,
		}),
	};

	await fetch(baseURL, requestOptions).then((data) => data.json());
};
