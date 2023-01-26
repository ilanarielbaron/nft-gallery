import InfoIcon from '@mui/icons-material/Favorite';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useNFTs } from '../../hooks/useNFTs';
import { selectNFTs, toggleNFTLike } from '../../store/nftsReducer';
import { selectWallet } from '../../store/walletReducer';

export const Card = ({ nft }: { nft: NFT }) => {
	const dispatch = useAppDispatch();
	const { updateLikesDB } = useNFTs();
	const wallet = useAppSelector(selectWallet);
	const nfts = useAppSelector(selectNFTs);
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
							updateLikesDB(
                wallet.id as string,
                nfts
                	.map((nftLiked) =>
                		nft.id === nftLiked.id ? { ...nftLiked, isLiked: !nftLiked.isLiked } : nftLiked,
                	)
                	.filter((nftItem) => nftItem.isLiked),
							);
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
