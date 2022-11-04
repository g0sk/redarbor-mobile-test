import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'components';
import { useTheme } from 'theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export const NavigationHeader: React.FC<{ title: string }> = ({ title }) => {
	const navigation = useNavigation();
	const theme = useTheme();
	return (
		<View height={60} backgroundColor="background">
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<View flexDirection="row" alignItems="center" padding="m">
					<View marginRight="l">
						<Icon
							name="arrow-back-outline"
							color={theme.colors.text}
							size={26}
						/>
					</View>
					<View>
						<Text variant="screenTitle">{title}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};
