import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectNFTs } from "../../store/nftsReducer";
import { Card } from '../Card';

export const Gallery = () => {
  const nfts = useAppSelector(selectNFTs);
  const nf = [...nfts, ...nfts];

  return (
    <Box sx={{ marginTop: 5 }}>
      <ImageList sx={{ height: 800 }}>
        <ImageListItem key="Subheader" cols={2} sx={{ marginBottom: 1 }}>
          <Typography variant="subtitle1">My NFTs</Typography>
        </ImageListItem>
        {nf.map((nft) => (
          <Card nft={nft} key={nft.id} />
        ))}
      </ImageList>
    </Box>
  )
};
