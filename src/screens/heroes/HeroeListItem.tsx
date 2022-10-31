import { Text, View } from 'components';
import * as React from 'react';
import { Image, ImageBackground, TouchableHighlight } from 'react-native';
import { HeroListItemProps, MarvelHero } from 'types';
import { useNavigation } from '@react-navigation/native';
import { useHero } from 'core/HeroProvider';

export const HeroeListItem: React.FC<HeroListItemProps> = ({ hero }) => {
	const navigation = useNavigation();
	const { setHero } = useHero();
	const uri = `${hero.thumbnail.path}/landscape_incredible.${hero.thumbnail.extension}`;

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
			<TouchableHighlight
				onPress={() => {
					setHero(hero);
					navigation.navigate('HeroeDetails', { hero: hero });
				}}
				style={{ borderRadius: 36 }}
				underlayColor="gray">
				<View flexDirection="column" alignItems="center">
					<ImageBackground
						source={{ uri: uri }}
						style={{ width: '100%', height: 150 }}
						imageStyle={{ borderRadius: 30 }}
					/>
					<View paddingVertical="m">
						<Text variant="cardTitle">{hero.name}</Text>
					</View>
					<View paddingVertical="s">
						<Text variant="cardTitle">{hero.comics.available}</Text>
					</View>
				</View>
			</TouchableHighlight>
		</View>
	);
};
