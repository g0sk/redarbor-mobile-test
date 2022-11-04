import * as React from 'react';
import { FC } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text } from 'components';
import { useTheme } from 'theme';
import { TouchableOpacity } from 'react-native';
import { CheckBoxProps } from 'types';

export const CheckBox: FC<CheckBoxProps> = ({ label, checked, onChange }) => {
	const theme = useTheme();

	return (
		<TouchableOpacity onPress={() => onChange()}>
			<View flexDirection="row" alignItems="center" height={30} width={100}>
				<View
					height={20}
					width={20}
					marginRight="m"
					borderRadius={theme.borderRadius.s}
					justifyContent="center"
					alignItems="center"
					borderWidth={1}
					borderColor="invertedText"
					backgroundColor="text">
					<Icon
						name="check"
						size={14}
						color={checked ? theme.colors.invertedText : theme.colors.text}
					/>
				</View>
				<Text variant="checkBox">{label}</Text>
			</View>
		</TouchableOpacity>
	);
};
