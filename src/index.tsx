import * as React from 'react';
import { RootNavigator } from 'navigation/RootNavigator';
import { AuthProvider } from 'core/AuthProvider';
import { ThemeProvider } from 'theme';
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
