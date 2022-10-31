import { Text, View } from 'components';
import * as React from 'react';
import { Image, ImageBackground } from 'react-native';
import { ComicListItemProps } from 'types';

export const ComicListItem: React.FC<ComicListItemProps> = ({ comic }) => {
	const uri = `${comic.thumbnail.path}/landscape_incredible.${comic.thumbnail.extension}`;
	return (
		<View
			margin="m"
			height={250}
			borderRadius={35}
			shadowColor="dark"
			shadowOpacity={0.26}
			shadowOffset={{ width: 0, height: 2 }}
			shadowRadius={10}
			elevation={3}
			backgroundColor="white"
			borderColor="lightGray"
			borderWidth={1}>
			<View style={{ borderRadius: 36 }}>
				<View flexDirection="column" alignItems="center">
					<ImageBackground
						source={{ uri: uri }}
						style={{ width: '100%', height: 150 }}
						imageStyle={{ borderRadius: 30 }}
					/>
					<View marginHorizontal="l" paddingVertical="m">
						<Text variant="cardTitle">{comic.title}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
