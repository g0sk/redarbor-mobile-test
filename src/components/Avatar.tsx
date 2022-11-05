import React from 'react';

import { Image } from 'react-native';
import { View } from './';
import { useTheme } from 'theme';

export const Avatar: React.FC = () => {
	const theme = useTheme();
	return (
		<View>
			<Image
				source={{ uri: require('../../assets/images/avatar.png') }}
				style={{
					height: 130,
					width: 130,
					borderRadius: 60,
					borderWidth: 3,
					borderColor: theme.colors.primary
				}}
			/>
		</View>
	);
};
