import * as React from 'react';
import { View, Text } from 'components';
import type { HeroDetailsScreenProps, MarvelComicData } from 'types';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'api/ApiRequestContextProvider';
import { API_URL } from '@env';
import { useHero } from 'core/HeroProvider';
import { Dimensions, FlatList, Image, ImageBackground } from 'react-native';
import { ComicListItem } from './ComicListItem';

const { height } = Dimensions.get('window');

export const HeroDetails: React.FC = () => {
	const { hero } = useHero();
	const [state, actions] = useCachedRequests();
	const HeaderComponent = () => {
		return (
			<ImageBackground
				style={{ width: '100%', height: 300 }}
				source={{
					uri: `${hero?.thumbnail.path}/landscape_incredible.${hero?.thumbnail.extension}`
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
							<Text>{hero?.name}</Text>
						</View>
						<View>
							<Text>{`Cómics: ${hero?.comics.available}`}</Text>
						</View>
					</View>
				</View>
			</ImageBackground>
		);
	};

	return (
		<View>
			<View>
				<View height={height}>
					<FlatList
						data={state.data?.[state.url] as MarvelComicData}
						ListHeaderComponent={<HeaderComponent />}
						renderItem={({ item }) => <ComicListItem comic={item} />}
						keyExtractor={(item, index) => index.toString()}
						refreshing={state.isFetching}
						onRefresh={() => actions.refresh()}
						onEndReached={() => actions.paginate()}
						onEndReachedThreshold={0.7}
					/>
				</View>
			</View>
		</View>
	);
};

export function CachedHeroDetails() {
	const { hero } = useHero();

	return (
		<CachedRequestsProvider
			url={`${API_URL}/v1/public/characters/${hero?.id}/comics`}
			maxResultsPerPage={10}>
			<HeroDetails />
		</CachedRequestsProvider>
	);
}
