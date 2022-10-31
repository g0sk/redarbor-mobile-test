import { Text, View } from 'components';
import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ComicListItemProps, HeroListItemProps, MarvelHero } from 'types';

export const ComicListItem: React.FC<ComicListItemProps> = ({ comic }) => {
	return (
		<View
			flexDirection="row"
			borderWidth={1}
			borderColor="dark"
			borderRadius={10}
			marginVertical="m"
			height={110}
			padding="l"
			justifyContent="space-between"
			alignItems="center">
			<View flexDirection="column">
				<View marginBottom="l">
					<Text>{comic.title}</Text>
				</View>
				<View>
					<Text>{comic.description}</Text>
				</View>
			</View>
			<View>
				<Image
					source={{
						uri:
							comic.thumbnail.path +
							'/portrait_medium.' +
							comic.thumbnail.extension
					}}
				/>
			</View>
		</View>
	);
};
