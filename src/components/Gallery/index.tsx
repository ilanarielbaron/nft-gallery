import { Box, Button, ImageList, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectNFTs } from '../../store/nftsReducer';
import { Card } from '../Card';

export const Gallery = () => {
	const nfts = useAppSelector(selectNFTs);
	const [displayLiked, setDisplayLiked] = useState(false);
	const nftsFiltered = displayLiked ? nfts.filter((nft) => nft.isLiked) : nfts;

	return (
		<Box sx={{ marginTop: 5 }}>
			<Box
				sx={{
					marginBottom: 2,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography variant='subtitle1'>My NFTs</Typography>
				<Button
					variant='text'
					sx={{ my: 1, mx: 1.5 }}
					onClick={(): void => {
						setDisplayLiked((prevState) => !prevState);
					}}
				>
					{displayLiked ? 'Show All' : 'Show Liked NFTs'}
				</Button>
			</Box>
			<ImageList sx={{ height: 800 }}>
				{nftsFiltered.map((nft) => (
					<Card nft={nft} key={nft.id} />
				))}
			</ImageList>
		</Box>
	);
};
