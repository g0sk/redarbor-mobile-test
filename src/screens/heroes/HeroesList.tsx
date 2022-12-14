import * as React from 'react';
import { Header, Screen, View } from 'components';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'api/ApiRequestContextProvider';
import { HeroListItem } from './HeroListItem';
import { API_URL } from '@env';
import { useTheme } from 'theme';
import { translate } from 'core/i18n';

const { height } = Dimensions.get('window');

const HeroesList: React.FC = () => {
	const [state, actions] = useCachedRequests();
	const heroListRef = React.createRef<FlatList<any>>();
	const theme = useTheme();

	return (
		<Screen>
			<View flex={1} flexDirection="column">
				<View>
					<Header
						title={translate('screen.heroesList.title')}
						defaultAction={() =>
							heroListRef.current?.scrollToIndex({ animated: true, index: 0 })
						}
					/>
				</View>
				{state.isFetching && !state.data ? (
					<View
						alignItems="center"
						justifyContent="center"
						height={height - 200}>
						<ActivityIndicator
							color={theme.colors.text}
							size="large"
							animating={state.isFetching}
						/>
					</View>
				) : (
					<View paddingBottom="xxl">
						<FlatList
							ref={heroListRef}
							data={state.data?.[state.url]}
							renderItem={({ item }) => <HeroListItem hero={item} />}
							initialNumToRender={10}
							keyExtractor={(item, index) => index.toString()}
							refreshing={state.isFetching}
							onRefresh={() => actions.refresh()}
							onEndReached={() => actions.paginate()}
							onEndReachedThreshold={3.5}
						/>
					</View>
				)}
			</View>
		</Screen>
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
