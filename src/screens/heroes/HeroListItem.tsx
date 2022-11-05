import { Text, View } from 'components';
import * as React from 'react';
import { ImageBackground, TouchableHighlight } from 'react-native';
import { HeroDetailsProps, HeroListItemProps } from 'types';
import { useNavigation } from '@react-navigation/native';
import { useHero } from 'core/HeroProvider';

export const HeroListItem: React.FC<HeroListItemProps> = ({ hero }) => {
	const navigation = useNavigation<HeroDetailsProps['navigation']>();
	const { setHero } = useHero();
	const uri = `${hero.thumbnail.path}/landscape_incredible.${hero.thumbnail.extension}`;

	return (
		<View flexDirection="column" marginVertical="m" marginHorizontal="l">
			<View
				height={250}
				borderRadius={35}
				shadowColor="dark"
				shadowOpacity={0.26}
				shadowOffset={{ width: 0, height: 2 }}
				shadowRadius={10}
				elevation={3}
				backgroundColor="background">
				<TouchableHighlight
					onPress={() => {
						setHero(hero);
						navigation.navigate('HeroDetails', {
							hero: hero,
							title: 'hello'
						});
					}}
					style={{ borderRadius: 36 }}
					underlayColor="gray">
					<View flexDirection="column" alignItems="center">
						<ImageBackground
							source={{ uri: uri }}
							style={{ width: '100%', height: 250, opacity: 0.9 }}
							imageStyle={{ borderRadius: 30 }}
						/>
					</View>
				</TouchableHighlight>
			</View>
			<View
				alignItems="center"
				flexDirection="row"
				justifyContent="space-between"
				marginVertical="m"
				marginHorizontal="l">
				<View maxWidth={200}>
					<Text variant="cardData">{hero.name}</Text>
				</View>
				<View>
					<Text variant="cardData">{`Cómics:${hero.comics.available}`}</Text>
				</View>
			</View>
		</View>
	);
};
