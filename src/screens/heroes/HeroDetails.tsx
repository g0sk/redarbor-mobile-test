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
	ImageBackground,
	SectionListScrollParams,
	ScrollView,
	SectionList,
	TouchableOpacity
} from 'react-native';
import { ComicListItem } from './ComicListItem';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'theme';

export const HeroDetails: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const [hideHeader, setHideHeader] = useState<boolean>(false);
	const theme = useTheme();
	const { hero } = useHero();
	const [state, actions] = useCachedRequests();
	const navigation = useNavigation();
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
				<View flexDirection="row" margin="m" alignItems="center">
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<View marginRight="l">
							<Icon
								name="arrow-back-outline"
								color={theme.colors.dark}
								size={28}
							/>
						</View>
					</TouchableOpacity>
					<View>
						<Text variant="backButton">{hero?.name}</Text>
					</View>
				</View>
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
						<View flexDirection="row" alignItems="center">
							<View marginRight="s">
								<Icon
									name="information-circle-outline"
									size={30}
									color={theme.colors.dark}
								/>
							</View>
							<View>
								<Text>Descripción</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => scrollToTop()}>
						<View
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between">
							<View marginRight="s">
								<Icon name="book-outline" size={30} color={theme.colors.dark} />
							</View>
							<View>
								<Text>{`${hero?.comics.available} cómics`}</Text>
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
					backgroundColor="white"
					justifyContent="center">
					<Text variant="header1">{title.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View backgroundColor="white">
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
					keyExtractor={(item, index) => item.id.toString()}
					refreshing={state.isFetching}
					onRefresh={() => actions.refresh()}
					onEndReached={() => actions.paginate()}
					onEndReachedThreshold={3}
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
