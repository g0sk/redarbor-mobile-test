import React from 'react';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const NavigationContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<SafeAreaProvider>
			<RNNavigationContainer>{children}</RNNavigationContainer>
		</SafeAreaProvider>
	);
};

export default NavigationContainer;
