import * as React from 'react';
import { Header, View } from 'components';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import type { MarvelHeroData } from 'types';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'api/ApiRequestContextProvider';
import { HeroeListItem } from './HeroeListItem';
import { API_URL } from '@env';

const { height } = Dimensions.get('window');

const HeroesList: React.FC = () => {
	const [state, actions] = useCachedRequests();

	return (
		<View flex={1} flexDirection="column">
			<View height={80}>
				<Header />
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
						data={state.data?.[state.url] as MarvelHeroData}
						renderItem={({ item }) => <HeroeListItem {...{ hero: item }} />}
						keyExtractor={(item, index) => index.toString()}
						refreshing={state.isFetching}
						onRefresh={() => actions.refresh()}
						onEndReached={() => actions.paginate()}
						onEndReachedThreshold={1.4}
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
