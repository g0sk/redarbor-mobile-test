import * as React from 'react';
import { RootNavigator } from 'navigation/RootNavigator';
import { AuthProvider } from 'core/AuthProvider';
import { ThemeProvider } from 'theme';
import { CachedRequestsProvider } from 'api/ApiRequestContextProvider';
import { API_URL } from '@env';

const App = () => {
	return (
		<AuthProvider>
			<ThemeProvider>
				<CachedRequestsProvider
					maxResultsPerPage={10}
					url={`${API_URL}/v1/public/characters`}>
					<RootNavigator />
				</CachedRequestsProvider>
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;
