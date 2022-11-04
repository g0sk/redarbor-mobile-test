import { View, Text } from 'components';
import * as React from 'react';
import { SmallAvatar } from './SmallAvatar';
import { TouchableOpacity } from 'react-native';
import { HeaderProps } from 'types';

export const Header: React.FC<HeaderProps> = ({ title, defaultAction }) => {
	return (
		<View
			flexDirection="row"
			marginHorizontal="l"
			alignItems="center"
			justifyContent="space-between"
			height={80}
			minHeight={80}
			maxHeight={80}>
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
