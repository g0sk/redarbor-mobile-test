import React from 'react';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthProvider } from './core/AuthProvider';
import { ThemeProvider } from 'theme';

const App = () => {
	return (
		<AuthProvider>
			<ThemeProvider>
				<RootNavigator />
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;
