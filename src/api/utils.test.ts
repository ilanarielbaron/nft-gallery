import { parseResponse } from './utils';

const mockResponse = [
  {
    "contract": {
      "address": "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c"
    },
    "id": {
      "tokenId": "tokenId1",
      "tokenMetadata": {
        "tokenType": "ERC1155"
      }
    },
    "balance": "1",
    "title": "title1",
    "description": "",
    "metadata": {
      "name": "title1",
      "image": "image1"
    },
    "timeLastUpdated": "2023-01-26T02:24:00.121Z",
  },
];

describe('parseResponse', () => {
  it('response parsed', () => {
    expect(parseResponse(mockResponse)).toEqual([{
      id: 'tokenId1',
      description: '',
      imageURL: 'image1',
      isLiked: false,
      title: 'title1'
    }]);
  });
  it('no response', () => {
    expect(parseResponse([])).toEqual([]);
  });
});
