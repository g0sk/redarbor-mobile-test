import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppNavigatorParamList } from 'types';
import { CachedHeroList } from 'screens/heroes/HeroesList';
import { CachedHeroDetails } from 'screens/heroes/HeroDetails';
import { Profile } from 'screens/profile/Profile';

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
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="HeroDetails"
				component={CachedHeroDetails}
				options={({ route }) => ({
					headerShown: false,
					title: route.params.title
				})}
			/>
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{
					title: 'Perfil',
					headerShown: true,
					headerTransparent: true
				}}
			/>
		</Stack.Navigator>
	);
};

export default AppNavigator;
