import * as React from 'react';
import { RootNavigator } from 'navigation/RootNavigator';
import { AuthProvider } from 'core/AuthProvider';
import { ThemeProvider } from 'theme';
import { CachedRequestsProvider } from 'api/ApiRequestContextProvider';
import { API_URL } from '@env';
import { HeroProvider } from 'core/HeroProvider';

const App = () => {
	return (
		<AuthProvider>
			<ThemeProvider>
				<HeroProvider>
					<RootNavigator />
				</HeroProvider>
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;
