import * as React from 'react';
import { Header, View } from 'components';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import type { MarvelHeroData } from 'types';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'core/ApiRequestContextProvider';
import { HeroListItem } from './HeroListItem';
import { API_URL } from '@env';

const { height } = Dimensions.get('window');

const HeroesList: React.FC = () => {
	const [state, actions] = useCachedRequests();
	const heroListRef = React.createRef<FlatList<any>>();
	return (
		<View flex={1} flexDirection="column">
			<View height={80}>
				<Header
					defaultAction={() =>
						heroListRef.current?.scrollToIndex({ animated: true, index: 0 })
					}
				/>
			</View>
			{state.isFetching && !state.data ? (
				<View alignItems="center" justifyContent="center" height={height - 200}>
					<ActivityIndicator
						color="black"
						size="large"
						animating={state.isFetching}
					/>
				</View>
			) : (
				<View height={height - 80}>
					<FlatList
						ref={heroListRef}
						data={state.data?.[state.url] as MarvelHeroData}
						renderItem={({ item }) => <HeroListItem hero={item} />}
						initialNumToRender={10}
						keyExtractor={(item, index) => index.toString()}
						refreshing={state.isFetching}
						onRefresh={() => actions.refresh()}
						onEndReached={() => actions.paginate()}
						onEndReachedThreshold={3}
					/>
				</View>
			)}
		</View>
	);
};

export function CachedHeroList() {
	return (
		<CachedRequestsProvider
			url={`${API_URL}/v1/public/characters`}
			maxResultsPerPage={10}>
			<HeroesList />
		</CachedRequestsProvider>
	);
}
