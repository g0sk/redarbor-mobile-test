import { View, Text, Button } from 'components';
import { useAuth } from 'core/AuthProvider';
import { Alert } from 'react-native';
import * as React from 'react';

export const Header = () => {
	return (
		<View
			flex={1}
			flexDirection="row"
			marginHorizontal="l"
			alignItems="center"
			justifyContent="space-between">
			<Text variant="headerTitle">Marvel heroes</Text>
		</View>
	);
};
