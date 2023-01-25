import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useAppSelector } from '../../hooks/useAppSelector';
import { disconnectWallet, walletIsConnected } from '../../store/walletReducer';
import { useMetamask } from '../../hooks/useMetamask';
import { useAppDispatch } from '../../hooks/useAppDispatch';

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
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={!isConnected ? connectHandler : () => { dispatch(disconnectWallet()) }}>
            {isConnected ? 'Disconnect' : 'Connect to Metamask'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main">
        {children}
      </Container>
    </React.Fragment>
  );
}

