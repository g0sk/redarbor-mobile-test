import * as React from 'react';
import { View } from 'components';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

export const Screen = ({ children }: { children: React.ReactNode }) => (
	<SafeAreaView>
		<View height={height} width={width} backgroundColor="background">
			{children}
		</View>
	</SafeAreaView>
);
