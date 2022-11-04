import * as React from 'react';
import { useState } from 'react';
import { View, Text, Modal, NavigationHeader, Screen } from 'components';
import type { MarvelComicData } from 'types';
import {
	CachedRequestsProvider,
	useCachedRequests
} from 'core/ApiRequestContextProvider';
import { API_URL } from '@env';
import { useHero } from 'core/HeroProvider';
import {
	ImageBackground,
	ScrollView,
	SectionList,
	TouchableOpacity
} from 'react-native';
import { ComicListItem } from './ComicListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'theme';

export const HeroDetails: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const theme = useTheme();
	const { hero } = useHero();
	const [state, actions] = useCachedRequests();
	const comicListRef = React.createRef<SectionList<any>>();

	const scrollToTop = () => {
		comicListRef.current?.scrollToLocation({
			animated: true,
			itemIndex: 0,
			sectionIndex: 0
		});
	};

	const DescriptionModal = () => {
		return (
			<View
				backgroundColor="background"
				minHeight={500}
				borderRadius={10}
				padding="m">
				<View margin="m">
					<Text variant="formLabel">{`Descripción de ${hero?.name}`}</Text>
				</View>
				<View flexDirection="row" margin="m" alignItems="center">
					<ScrollView scrollEnabled={true}>
						<Text variant="heroDescription">
							{hero && hero.description.length > 0
								? hero.description
								: 'Actualmente no existe una descripción para este héroe'}
						</Text>
					</ScrollView>
				</View>
			</View>
		);
	};

	const HeaderComponent = () => {
		return (
			<View>
				<NavigationHeader title={hero ? hero.name : ''} />
				<View>
					<ImageBackground
						style={{ width: '100%', height: 300 }}
						source={{
							uri: `${hero?.thumbnail.path}/landscape_incredible.${hero?.thumbnail.extension}`
						}}
					/>
				</View>
				<View margin="m" flexDirection="row" justifyContent="space-around">
					<TouchableOpacity onPress={() => setShow(!show)}>
						<View
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between">
							<View marginRight="s">
								<Icon
									name="information-circle"
									size={30}
									color={theme.colors.text}
								/>
							</View>
							<View>
								<Text variant="infoLabel">Descripción</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => scrollToTop()}>
						<View
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between">
							<View marginRight="s">
								<Icon name="book" size={30} color={theme.colors.text} />
							</View>
							<View>
								<Text variant="infoLabel">{`${hero?.comics.available} cómics`}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const SectionHeader: React.FC<{ title: string }> = (title) => {
		return (
			<TouchableOpacity onPress={() => scrollToTop()}>
				<View
					paddingHorizontal="m"
					height={70}
					backgroundColor="background"
					justifyContent="center">
					<Text variant="header1">{title.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<Screen>
			<View>
				<Modal
					children={<DescriptionModal />}
					show={show}
					setVisibility={setShow}
				/>
				<SectionList
					ref={comicListRef}
					sections={[
						{
							title: `Cómics de ${hero?.name}`,
							data: state.data ? (state.data[state.url] as MarvelComicData) : []
						}
					]}
					renderItem={({ item }) => <ComicListItem comic={item} />}
					ListHeaderComponent={<HeaderComponent />}
					stickySectionHeadersEnabled={true}
					renderSectionHeader={({ section: { title } }) => (
						<SectionHeader title={title} />
					)}
					keyExtractor={(item, index) => index.toString()}
					refreshing={state.isFetching}
					onRefresh={() => actions.refresh()}
					onEndReached={() => actions.paginate()}
					onEndReachedThreshold={2}
				/>
			</View>
		</Screen>
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
