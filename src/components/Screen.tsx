import * as React from 'react';
import { View } from 'components';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorHandler } from 'handlers/error';

const { height, width } = Dimensions.get('window');

export const Screen = ({ children }: { children: React.ReactNode }) => (
	<ErrorHandler>
		<SafeAreaView>
			<View height={height} width={width} backgroundColor="background">
				{children}
			</View>
		</SafeAreaView>
	</ErrorHandler>
);
