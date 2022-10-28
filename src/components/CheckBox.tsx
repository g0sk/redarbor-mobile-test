import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text } from 'components';
import { useTheme } from 'theme';
import { TouchableOpacity } from 'react-native';

interface CheckBoxProps extends PropsWithChildren {
	label?: string;
	checked: boolean;
	onChange: () => void;
}

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
					borderWidth={checked ? 0 : 1}
					borderColor={checked ? 'white' : 'primary'}
					backgroundColor={checked ? 'primary' : 'white'}>
					<Icon name="check" color="white" />
				</View>
				<Text variant="checkBox">{label}</Text>
			</View>
		</TouchableOpacity>
	);
};
