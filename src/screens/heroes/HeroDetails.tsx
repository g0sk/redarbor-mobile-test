import * as React from 'react';
import { View, Text, Modal } from 'components';
import type { MarvelComicData } from 'types';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'core/ApiRequestContextProvider';
import { API_URL } from '@env';
import { useHero } from 'core/HeroProvider';
import {
	FlatList,
	ImageBackground,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { ComicListItem } from './ComicListItem';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export const HeroDetails: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const { hero } = useHero();
	const [state, actions] = useCachedRequests();
	const navigation = useNavigation();
	const comicListRef = React.createRef<FlatList<any>>();

	useEffect(() => {
		navigation.setOptions({ title: hero?.name });
	}, []);

	const scrollToTop = () => {
		comicListRef.current?.scrollToIndex({ animated: true, index: 0 });
	};

	const DescriptionModal = () => {
		return (
			<View backgroundColor="white" minHeight={400} borderRadius={10}>
				<View margin="m">
					<Text variant="formLabel">{`${hero?.name} description`}</Text>
				</View>
				<View flexDirection="row" margin="m" alignItems="center">
					<ScrollView scrollEnabled={true}>
						<Text variant="heroDescription">
							{hero && hero.description.length > 0
								? hero.description
								: 'Descripción no disponible'}
						</Text>
					</ScrollView>
				</View>
			</View>
		);
	};

	const HeaderComponent = () => {
		return (
			<View>
				<View>
					<TouchableOpacity onPress={() => setShow(!show)}>
						<ImageBackground
							style={{ width: '100%', height: 300 }}
							source={{
								uri: `${hero?.thumbnail.path}/landscape_incredible.${hero?.thumbnail.extension}`
							}}
						/>
					</TouchableOpacity>
				</View>
				<View margin="m">
					<Text variant="header1">{`${hero?.name} comics`}</Text>
				</View>
			</View>
		);
	};

	return (
		<View>
			<View>
				<Modal
					children={<DescriptionModal />}
					show={show}
					setVisibility={setShow}
				/>
				<FlatList
					ref={comicListRef}
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
