import InfoIcon from '@mui/icons-material/Info';
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";

export const Card = ({ nft }: { nft: NFT }) => (
  <ImageListItem>
    <img
      src={nft.imageURL}
      srcSet={nft.imageURL}
      alt={nft.title}
      loading="lazy"
    />
    <ImageListItemBar
      title={nft.title}
      subtitle={nft.description}
      actionIcon={
        <IconButton
          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          aria-label={`info about ${nft.title}`}
        >
          <InfoIcon />
        </IconButton>
      }
    />
  </ImageListItem>
);
