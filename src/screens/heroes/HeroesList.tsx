import * as React from 'react';
import { Text, View, Button } from 'components';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import type { HeroesListScreenProps, MarvelHeroData } from 'types';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'api/ApiRequestContextProvider';
import { HeroeListItem } from './HeroeListItem';
import { useEffect } from 'react';
import { API_URL } from '@env';

const { height } = Dimensions.get('window');

const HeroesList: React.FC = () => {
	const [state, actions] = useCachedRequests();

	return (
		<View flex={1} flexDirection="column">
			{state.isFetching && !state.data ? (
				<ActivityIndicator
					color="black"
					size="large"
					animating={state.isFetching}
				/>
			) : (
				<View>
					<View>
						<Text>Marvel heroes list</Text>
					</View>
					<View height={height}>
						<FlatList
							data={state.data?.[state.url] as MarvelHeroData}
							renderItem={({ item }) => <HeroeListItem {...{ hero: item }} />}
							keyExtractor={(item, index) => index.toString()}
							refreshing={state.isFetching}
							onRefresh={() => actions.refresh()}
							onEndReached={() => actions.paginate()}
							onEndReachedThreshold={0.7}
						/>
					</View>
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
