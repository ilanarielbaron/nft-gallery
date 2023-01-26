import * as React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { disconnectWallet, walletIsConnected } from '../../store/walletReducer';
import { useMetamask } from '../../hooks/useMetamask';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { disconnect } from '../../store/nftsReducer';
import { AppBar, Button, Container, CssBaseline, GlobalStyles, Toolbar, Typography } from '@mui/material';

export const Layout = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();
  const { connectHandler } = useMetamask();
  const isConnected = useAppSelector(walletIsConnected);

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            NFT Gallery
          </Typography>
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}
            onClick={!isConnected
              ? connectHandler
              : () => { dispatch(disconnectWallet()); dispatch(disconnect()) }}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main">
        {children}
      </Container>
    </React.Fragment>
  );
}
