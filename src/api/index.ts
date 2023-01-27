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
const ALKEMY_KEY = 'ps5CP8tz3y5oTzMDqwi90FjMjgM-Fe7d';

const BASE_HEADERS = {
	'cache-control': 'no-cache',
	'x-apikey': API_KEY,
};

const BASE_URL = 'https://gallery-814b.restdb.io/rest/user-state';

export const getNFTsAlkemy = async (address: string): Promise<GetNFTs> => {
	//@ts-expect-error out of typescript scope
	const chainId = window.ethereum.chainId;
	//In a real project the API_KEY should be in a .env file
	const chain = chainIds[chainId];
	const baseURL = `https://${chain}.g.alchemy.com/v2/${ALKEMY_KEY}/getNFTs/`;
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

interface FetchAPIInput {
	fetchURL: string,
	options: {
		method: string, headers: {
			'cache-control': string;
			'x-apikey': string;
		}
	}
}

const fetchAPI = async ({ fetchURL, options }: FetchAPIInput) => {
	const response = await fetch(fetchURL, options).then((data) => data.json());
	if (!response[0]) return null;

	return { ...response[0], ...(response[0]?.['_id'] && { id: response[0]['_id'] }) };
};

export const getUserConnected = async (address: string): Promise<User | null> => {
	const requestOptions = {
		method: 'GET',
		headers: BASE_HEADERS,
	};
	const fetchURL = `${BASE_URL}?q={"isConnected":true, "address":"${address}"}`;

	return await fetchAPI({ fetchURL, options: requestOptions });
};

export const getUserByAddress = async (
	address: string,
): Promise<User | null> => {
	const requestOptions = {
		method: 'GET',
		headers: BASE_HEADERS,
	};
	const fetchURL = `${BASE_URL}?q={"address":"${address}"}`;

	return await fetchAPI({ fetchURL, options: requestOptions });
};

export const createUser = async (address: string, chainId: string): Promise<string> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			...BASE_HEADERS,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			address,
			isConnected: true,
			nftsLiked: [],
			chainId,
		}),
	};
	const response = await fetch(BASE_URL, requestOptions).then((data) => data.json());

	return response['_id'];
};

export const connectUser = async (id: string): Promise<void> => {
	const baseURL = `${BASE_URL}/${id}`;
	const requestOptions = {
		method: 'PATCH',
		headers: {
			...BASE_HEADERS,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			_id: id,
			isConnected: true,
		}),
	};

	await fetch(baseURL, requestOptions).then((data) => data.json());
};

export const disconnectUser = async (id: string): Promise<void> => {
	const baseURL = `${BASE_URL}/${id}`;
	const requestOptions = {
		method: 'PATCH',
		headers: {
			...BASE_HEADERS,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			_id: id,
			isConnected: false,
		}),
	};

	await fetch(baseURL, requestOptions).then((data) => data.json());
};

export const updateLikes = async (id: string, likes: string[]): Promise<void> => {
	const baseURL = `${BASE_URL}/${id}`;
	const requestOptions = {
		method: 'PATCH',
		headers: {
			...BASE_HEADERS,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			_id: id,
			nftsLiked: likes,
		}),
	};

	await fetch(baseURL, requestOptions).then((data) => data.json());
};
