import * as React from 'react';
import { View } from 'components';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ProfileProps } from 'types';

export const SmallAvatar: React.FC = () => {
	const navigation = useNavigation<ProfileProps['navigation']>();
	return (
		<View flexDirection="column">
			<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
				<View>
					<Image
						style={{
							height: 40,
							width: 40,
							borderRadius: 80
						}}
						source={{ uri: require('../../assets/images/avatar.png') }}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};
