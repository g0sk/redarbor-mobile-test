import { View, Text } from 'components';
import * as React from 'react';
import { SmallAvatar } from './SmallAvatar';
import { TouchableOpacity } from 'react-native';

export const Header: React.FC<{ defaultAction: () => void }> = ({
	defaultAction
}) => {
	return (
		<View
			flex={1}
			flexDirection="row"
			marginHorizontal="l"
			alignItems="center"
			justifyContent="space-between">
			<View>
				<TouchableOpacity onPress={() => defaultAction()}>
					<Text variant="headerTitle">Marvel heroes</Text>
				</TouchableOpacity>
			</View>
			<View>
				<SmallAvatar />
			</View>
		</View>
	);
};
