import { Text, View } from 'components';
import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { HeroListItemProps, MarvelHero } from 'types';
import { useNavigation } from '@react-navigation/native';
import { useHero } from 'core/HeroProvider';

export const HeroeListItem: React.FC<HeroListItemProps> = ({ hero }) => {
	const navigation = useNavigation();
	const { setHero } = useHero();
	return (
		<TouchableOpacity
			onPress={() => {
				setHero(hero);
				navigation.navigate('HeroeDetails', { hero: hero });
			}}>
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
		</TouchableOpacity>
	);
};
