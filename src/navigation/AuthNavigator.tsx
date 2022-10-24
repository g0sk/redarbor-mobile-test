import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from 'screens/login';
import type { AuthParamList } from 'types';

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
};

export default AuthNavigator;
