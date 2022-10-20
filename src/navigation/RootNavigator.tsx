import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import NavigationContainer from './NavigationContainer';
import type { RootNavigatorParamList } from 'types';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Auth" component={AuthNavigator} />
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
