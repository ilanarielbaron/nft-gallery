import InfoIcon from '@mui/icons-material/Favorite';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleNFTLike } from '../../store/nftsReducer';

export const Card = ({ nft }: { nft: NFT }) => {
	const dispatch = useAppDispatch();
	const likeColor = nft.isLiked ? 'rgba(208, 16, 16, 0.8)' : 'rgba(255, 255, 255, 0.8)';

	return (
		<ImageListItem>
			<img src={nft.imageURL} srcSet={nft.imageURL} alt={nft.title} loading='lazy' />
			<ImageListItemBar
				sx={{ height: 75 }}
				title={nft.title}
				subtitle={nft.description}
				actionIcon={
					<IconButton
						sx={{ color: likeColor, cursos: 'pointer' }}
						aria-label={`info about ${nft.title}`}
						onClick={(): void => {
							dispatch(toggleNFTLike({ id: nft.id }));
						}}
					>
						<InfoIcon />
					</IconButton>
				}
			/>
		</ImageListItem>
	);
};
