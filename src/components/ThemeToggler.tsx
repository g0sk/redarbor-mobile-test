import * as React from 'react';
import { useState } from 'react';
import { Switch } from 'react-native';
import { useColorTheme, useTheme } from 'theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from './View';
import { Text } from './Text';
import { setTheme } from 'utils/storage';

export const ThemeToggler: React.FC = () => {
	const { colorTheme, setColorTheme } = useColorTheme();
	const theme = useTheme();
	const [value, setValue] = useState<boolean>(false);
	const changeTheme = () => {
		setValue(!value);
		setColorTheme(colorTheme === 'light' ? 'dark' : 'light');
		setTheme(value ? 'dark' : 'light');
	};
	return (
		<View flexDirection="row" alignItems="center">
			<View flexDirection="row">
				<View marginRight="m">
					<Icon
						name={colorTheme === 'light' ? 'sunny' : 'sunny-outline'}
						size={25}
						color={theme.colors.text}
						style={{
							borderColor:
								colorTheme === 'light'
									? theme.colors.invertedText
									: theme.colors.text
						}}
					/>
				</View>
				<View marginRight="l">
					<Switch
						style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
						value={value}
						onChange={() => changeTheme()}
						trackColor={{
							false: theme.colors.description,
							true: theme.colors.description
						}}
						thumbColor={theme.colors.text}
					/>
				</View>
				<View>
					<Icon
						name={colorTheme === 'dark' ? 'moon' : 'moon-outline'}
						size={25}
						color={theme.colors.text}
					/>
				</View>
			</View>
		</View>
	);
};
