import * as React from 'react';
import { Text, View, Button } from 'components';
import { FlatList } from 'react-native';
import type { MarvelHeroData } from 'types';
import { useCachedRequests } from 'api/ApiRequestContextProvider';
import { HeroeListItem } from './HeroeListItem';
import { useEffect } from 'react';

export const HeroesList = () => {
	const [state, actions] = useCachedRequests();

	useEffect(() => {
		actions.getHeroes();
	}, []);

	return (
		<View flex={1} flexDirection="column">
			<View>
				<Text>Marvel heroes list</Text>
			</View>
			<Button label="press" onPress={() => actions.getHeroes()} />
			<View marginVertical="l">
				<FlatList
					data={state.data?.[state.url] as MarvelHeroData}
					renderItem={({ item }) => <HeroeListItem hero={item} />}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</View>
	);
};
