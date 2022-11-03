import { View, Text } from 'components';
import * as React from 'react';
import { SmallAvatar } from './SmallAvatar';
import { TouchableOpacity } from 'react-native';
import { HeaderProps } from 'types';

export const Header: React.FC<HeaderProps> = ({ title, defaultAction }) => {
	return (
		<View
			flex={1}
			flexDirection="row"
			marginHorizontal="l"
			alignItems="center"
			justifyContent="space-between">
			<View>
				<TouchableOpacity onPress={() => defaultAction()}>
					<Text variant="headerTitle">{title}</Text>
				</TouchableOpacity>
			</View>
			<View>
				<SmallAvatar />
			</View>
		</View>
	);
};
