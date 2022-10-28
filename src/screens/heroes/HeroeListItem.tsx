import { Text, View } from 'components';
import * as React from 'react';
import { Image } from 'react-native';
import { MarvelHero } from 'types';

export const HeroeListItem: React.FC<{ hero: MarvelHero }> = ({ hero }) => {
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
					<Text>{hero.name}</Text>
				</View>
				<View>
					<Text>{`Cómics: ${hero.comics.available}`}</Text>
				</View>
			</View>
			<View>
				<Image
					style={{ height: 100, width: 100, borderRadius: 50 }}
					source={{
						uri:
							hero.thumbnail.path +
							'/portrait_medium.' +
							hero.thumbnail.extension
					}}
				/>
			</View>
		</View>
	);
};
