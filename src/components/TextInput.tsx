import * as React from 'react';
import { forwardRef } from 'react';
import {
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { View } from './View';
import { useTheme } from 'theme';

interface TextInputProps extends RNTextInputProps {
	icon: string | null;
	touched?: boolean;
	error?: string;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
	({ icon, touched, error, ...props }: TextInputProps, ref) => {
		const theme = useTheme();
		const color: keyof typeof theme.colors = !touched
			? 'text'
			: error
			? 'error'
			: 'valid';
		const iconColor = theme.colors[color];
		return (
			<View
				flexDirection="row"
				height={48}
				alignItems="center"
				borderRadius={theme.borderRadius.m}
				borderWidth={1}
				borderColor={touched ? (!error ? 'valid' : 'error') : 'text'}
				paddingRight="m">
				{icon !== null && (
					<View padding="s">
						<Icon name={icon} color={iconColor} />
					</View>
				)}
				<View flex={1}>
					<RNTextInput
						style={{ color: theme.colors.text }}
						underlineColorAndroid="transparent"
						selectionColor={theme.colors.text}
						placeholderTextColor={iconColor}
						{...{ ref }}
						{...props}
					/>
				</View>
				{touched && (
					<View
						borderRadius={theme.borderRadius.l}
						justifyContent="center"
						alignItems="center"
						height={18}
						width={18}
						backgroundColor={!error ? 'valid' : 'error'}>
						<Icon
							name={!error ? 'check' : 'x'}
							color={theme.colors.white}
							size={10}
						/>
					</View>
				)}
			</View>
		);
	}
);
