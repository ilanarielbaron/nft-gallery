import InfoIcon from '@mui/icons-material/Info';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectNFTs } from "../../store/nftsReducer";

export const Gallery = () => {
  const nfts = useAppSelector(selectNFTs)

  return (
    <Box >
      <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
          <Typography variant="subtitle1">Gallery</Typography>
        </ImageListItem>
        {nfts.map((nft) => (
          <ImageListItem key={nft.id}>
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
        ))}
      </ImageList>
    </Box>
  )
};
