import * as React from 'react';
import { View, Text } from 'components';
import type { HeroDetailsScreenProps, MarvelComicData } from 'types';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'api/ApiRequestContextProvider';
import { API_URL } from '@env';
import { useHero } from 'core/HeroProvider';
import { Dimensions, FlatList, Image } from 'react-native';
import { ComicListItem } from './ComicListItem';
import { useAuth } from 'core/AuthProvider';

const { height } = Dimensions.get('window');

export const HeroDetails: React.FC = () => {
	const { Hero } = useHero();
	const [state, actions] = useCachedRequests();
	return (
		<View>
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
						<Text>{Hero?.name}</Text>
					</View>
					<View>
						<Text>{`Cómics: ${Hero?.comics.available}`}</Text>
					</View>
				</View>
				<View>
					<Image
						style={{ height: 100, width: 100, borderRadius: 50 }}
						source={{
							uri:
								Hero?.thumbnail.path +
								'/portrait_medium.' +
								Hero?.thumbnail.extension
						}}
					/>
				</View>
			</View>
			<View>
				<View height={height - 110}>
					<FlatList
						data={state.data?.[state.url] as MarvelComicData}
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
	const { Hero } = useHero();

	return (
		<CachedRequestsProvider
			url={`${API_URL}/v1/public/characters/${Hero?.id}/comics`}
			maxResultsPerPage={10}>
			<HeroDetails />
		</CachedRequestsProvider>
	);
}
