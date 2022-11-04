import React from 'react';
import { View, Screen, Button, Text } from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'theme';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export function ErrorFallback({ resetErrorBoundary }: any) {
	return (
		<View
			justifyContent="center"
			flexDirection="column"
			height={height}
			width={width}
			backgroundColor="background">
			<View margin="xl" height={385}>
				<View>
					<Text variant="errorHeader">Ooops parece que algo ha fallado...</Text>
				</View>
				<View alignItems="center" marginVertical="dxxl">
					<Icon
						name="thumbs-down-outline"
						size={100}
						color={useTheme().colors.error}
					/>
				</View>
			</View>
			<View marginVertical="dxxl" marginHorizontal="xxl">
				<Button
					variant="delete"
					label="Volver a intentar"
					onPress={resetErrorBoundary}
				/>
			</View>
		</View>
	);
}
