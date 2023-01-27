import * as React from 'react';
import { Container, CssBaseline, GlobalStyles } from '@mui/material';
import { Header } from '../Header';

const Layout = ({ children }: { children: React.ReactElement }) => (
	<React.Fragment>
		<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
		<CssBaseline />
		<Header />
		<Container maxWidth='md' component='main'>
			{children}
		</Container>
	</React.Fragment>
);

export default React.memo(Layout);
