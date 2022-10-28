import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppNavigatorParamList } from 'types';
import { HeroesList } from 'screens/heroes/HeroesList';
import { HeroeDetails } from 'screens/heroes/HeroeDetails';
import { CachedRequestsProvider } from 'api/ApiRequestContextProvider';
import { API_URL } from '@env';

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="HeroesList"
			screenOptions={{
				animation: 'slide_from_right',
				presentation: 'card',
				headerShown: false
			}}>
			<Stack.Screen name="HeroesList" component={HeroesList} />
			<Stack.Screen name="HeroeDetails" component={HeroeDetails} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
