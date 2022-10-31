import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppNavigatorParamList } from 'types';
import { CachedHeroList } from 'screens/heroes/HeroesList';
import { CachedHeroDetails } from 'screens/heroes/HeroeDetails';

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="HeroesList"
			screenOptions={{
				animation: 'slide_from_right',
				presentation: 'card'
			}}>
			<Stack.Screen
				name="HeroesList"
				component={CachedHeroList}
				options={{ headerShown: false, headerStyle: {} }}
			/>
			<Stack.Screen name="HeroeDetails" component={CachedHeroDetails} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
