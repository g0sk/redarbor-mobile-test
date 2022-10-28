import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
	BackgroundColorProps,
	BorderProps,
	SpacingProps,
	VariantProps
} from '@shopify/restyle';
import { getHeroComics, getHeroes } from 'api/HeroApi';
import { ApisauceInstance } from 'apisauce';
import { Theme } from 'theme';

export type Credentials = {
	name: string;
	lastName: string;
	email: string;
};

//Navigation

export type RootNavigatorParamList = {
	Auth: AuthParamList;
	App: AppNavigatorParamList;
};

export type AuthParamList = {
	Login: undefined;
};

export type AppNavigatorParamList = {
	HeroesList: undefined;
	HeroeDetails: undefined;
};

export type HeroDetailsRouteProp = RouteProp<
	AppNavigatorParamList,
	'HeroeDetails'
>;
export type HeroDetailsNavigationProp = NavigationProp<
	AppNavigatorParamList,
	'HeroeDetails'
>;
export type HeroDetailsScreenProps = {
	navigation: HeroDetailsNavigationProp;
	route: HeroDetailsRouteProp;
};

//Components
export type ButtonProps = SpacingProps<Theme> &
	VariantProps<Theme, 'buttonVariants'> &
	BorderProps<Theme> &
	BackgroundColorProps<Theme> & {
		onPress: () => void;
		label?: string;
		outline?: boolean;
		loading?: boolean;
		disabled?: boolean;
	};

export type MarvelHero = {
	id: number;
	name: string;
	description: string;
	modified: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	resourceUri: string;
	comics: {
		available: number;
		collectionURI: string;
		items: [
			{
				resourceURI: string;
				name: string;
			}
		];
		returned: number;
	};
	series: {
		available: number;
		collectionURI: string;
		items: [
			{
				resourceURI: string;
				name: string;
			}
		];
		returned: number;
	};
	stories: {
		available: number;
		collectionURI: string;
		items: [
			{
				resourceURI: string;
				name: string;
				type: string;
			}
		];
		returned: number;
	};
	events: {
		available: number;
		collectionURI: string;
		items: [
			{
				resourceURI: string;
				name: string;
			}
		];
		returned: number;
	};
	urls: [
		{
			type: string;
			url: string;
		}
	];
};
//Marvel api
export type MarvelHeroData = Array<MarvelHero>;

export type MarvelComicData = Array<{
	id: number;
	digitalId: number;
	title: string;
	issueNumber: number;
	variantDescription: string;
	description: string;
	modified: string;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: number;
	textObjects: [
		{
			type: string;
			language: string;
			text: string;
		}
	];
	resourceURI: string;
	urls: [
		{
			type: string;
			url: string;
		}
	];
	series: {
		resourceURI: string;
		name: string;
	};
	variants: [
		{
			resourceURI: string;
			name: string;
		}
	];
	collections: [
		{
			resourceURI: string;
			name: string;
		}
	];
	collectedIssues: [
		{
			resourceURI: string;
		}
	];
	dates: [
		{
			type: string;
			date: string;
		}
	];
	prices: [
		{
			type: string;
			price: number;
		}
	];
	thumbnaiL: {
		path: string;
		extension: string;
	};
	images: [{ path: string; extension: string }];
	creators: {
		available: number;
		collectionURI: string;
		items: [
			{
				resourceURI: string;
				name: string;
				role: string;
			}
		];
		returned: number;
	};
	characters: {
		available: number;
		collectionURI: string;
		items: [{ resourceURI: string; name: string }];
		returned: number;
	};
	stories: {
		available: number;
		collectionURI: string;
		items: [{ resourceURI: string; name: string; type: string }];
		returned: number;
	};
	events: {
		available: number;
		collectionURI: string;
		items: [
			{
				resourceURI: string;
				name: string;
			}
		];
		returned: number;
	};
}>;

export type MarvelHeroesListResponse = {
	//TODO: tipar las respuestas de API para listado de héroes
	attributionHTML: string;
	attributionText: string;
	code: number;
	copyright: string;
	data: {
		count: number;
		limit: number;
		offset: number;
		results: MarvelHeroData;
	};
};

export type MarvelHeroComicsListResponse = {
	//TODO: tipar las respuestas de API para listado de cómics de un héroe
	attributionHTML: string;
	attributionText: string;
	code: number;
	copyright: string;
	data: {
		count: number;
		limit: number;
		offset: number;
		results: MarvelComicData;
	};
};

export type MarvelResponse =
	| MarvelHeroesListResponse
	| MarvelHeroComicsListResponse;

export type MarvelData = {
	[key in string]: MarvelHeroData | MarvelComicData;
};

export type ContextStateUninitialized = {
	url?: undefined;
	isFetching: false;
	data?: undefined;
};

export type ContextStateInitialized = {
	url: string;
	isFetching: false;
	data?: undefined;
};

export type ContextStateFetching<T> = {
	url: string;
	isFetching: true;
	data?: T;
};

export type ContextStateFetched<T> = {
	url: string;
	isFetching: false;
	data: T;
	apisauceInstance: ApisauceInstance;
};

export type ApiRequestContextState<T> =
	| ContextStateUninitialized
	| ContextStateInitialized
	| ContextStateFetching<T>
	| ContextStateFetched<T>;

export interface IActions {
	paginate(): void;
	getHeroes(): void;
	getHeroComics(): void;
}
export type Props = {
	url: string;
	maxResultsPerPage: number;
	children: JSX.Element;
};
