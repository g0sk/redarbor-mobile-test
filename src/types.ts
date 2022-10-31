import {
	BackgroundColorProps,
	BorderProps,
	SpacingProps,
	VariantProps
} from '@shopify/restyle';
import { ApisauceInstance } from 'apisauce';
import { Dispatch, SetStateAction } from 'react';
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
	HeroDetails: {
		hero: MarvelHero;
		title: string;
	};
	Profile: undefined;
};

export type HeroDetailsScreenProps = {
	hero: MarvelHero;
};

//Components

export interface ModalProps {
	children: React.ReactNode;
	show: boolean;
	setVisibility: Dispatch<SetStateAction<boolean>>;
	onClose?: () => void;
}

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

export type HeroListItemProps = {
	hero: MarvelHero;
};

//Marvel api

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

export type MarvelHeroData = Array<{
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
}>;

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
	thumbnail: {
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

export type MarvelComic = {
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
	thumbnail: {
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
};

export type MarvelHeroesListResponse = {
	//TODO: tipar las respuestas de API para listado de héroes
	data: {
		results: MarvelHeroData;
	};
};

export type MarvelHeroComicsListResponse = {
	//TODO: tipar las respuestas de API para listado de cómics de un héroe
	data: {
		results: MarvelComicData;
	};
};

export type ComicListItemProps = {
	comic: MarvelComic;
};

export type MarvelResponse =
	| MarvelHeroesListResponse
	| MarvelHeroComicsListResponse;

export type MarvelData = MarvelHeroData | MarvelComicData;

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
	refresh(): void;
}
export type Props = {
	url: string;
	maxResultsPerPage: number;
	children: JSX.Element;
};
