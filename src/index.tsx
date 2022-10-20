import React from 'react';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthProvider } from './core/AuthProvider';

const App = () => {
	return (
		<AuthProvider>
			<RootNavigator />
		</AuthProvider>
	);
};

export default App;
