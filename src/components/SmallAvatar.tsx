import * as React from 'react';
import { View } from 'components';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SmallAvatar: React.FC = () => {
	const navigation = useNavigation();
	return (
		<View flexDirection="column">
			<TouchableOpacity onPress={() => navigation.navigate('Profile', {})}>
				<View>
					<Image
						style={{
							height: 40,
							width: 40,
							borderRadius: 80
						}}
						source={require('../../assets/images/avatar.png')}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};
