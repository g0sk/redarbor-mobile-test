import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import NavigationContainer from './NavigationContainer';
import { useAuth } from '../core/AuthProvider';
import type { RootNavigatorParamList } from 'types';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootStack = () => {
	const { status } = useAuth();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			{status === 'signOut' && (
				<Stack.Screen name="Auth" component={AuthNavigator} />
			)}
		</Stack.Navigator>
	);
};

export const RootNavigator = () => {
	return (
		<NavigationContainer>
			<RootStack />
		</NavigationContainer>
	);
};