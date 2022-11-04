import * as React from 'react';
import { RootNavigator } from 'navigation/RootNavigator';
import { AuthProvider } from 'core/AuthProvider';
import { HeroProvider } from 'core/HeroProvider';
import { ThemeProvider } from 'theme';

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
