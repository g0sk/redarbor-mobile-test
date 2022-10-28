import { API_HASH, API_PRIVATE_KEY, API_PUBLIC_KEY } from '@env';
import { ApisauceInstance, create } from 'apisauce';
import { URL, URLSearchParams } from 'react-native-url-polyfill';
import * as React from 'react';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';
import {
	ApiRequestContextState,
	ContextStateFetched,
	ContextStateInitialized,
	ContextStateUninitialized,
	IActions,
	MarvelData,
	MarvelHeroData,
	MarvelResponse,
	MarvelHeroesListResponse,
	Props,
	MarvelHeroComicsListResponse
} from 'types';

const initialState = {
	isFetching: false
};

type ProxyHandler<T, P extends string> = {
	get?(target: T, p: P, receiver: any): any;
	set?(
		target: { data: { results: { [key in P]?: T } } },
		p: P,
		value: any,
		receiver: any
	): boolean;
};

declare const Proxy: {
	new <T extends object>(
		target: {
			data: { results: { [key in string]: T } };
			apiInstance: ApisauceInstance;
		},
		handler: ProxyHandler<T, string>
	): { [key: string]: Promise<T> };
};

const marvelProxy = new Proxy<MarvelResponse>(
	{
		apiInstance: create({
			baseURL: 'https://developer.marvel.com',
			headers: { 'If-None-Match': '123' }
		}),
		data: {
			results: {}
		}
	},
	{
		get: function <T extends MarvelResponse>(
			target: {
				data: {
					results: {
						[key in string]: T;
					};
				};
			},
			url: string
		) {
			const values = target;

			return new Promise<T>(async (resolve, reject) => {
				if (values.data.results.hasOwnProperty(url)) {
					resolve(values.data.results[url] as T);
					return;
				}
				try {
					const response = await (
						target as {
							data: {
								results: {
									[key in string]: T;
								};
							};
							apiInstance: ApisauceInstance;
						}
					).apiInstance.get<T>(url);
					const { data } = response;
					if (response.data) {
						if (
							(response.originalError &&
								response.originalError?.response?.status !== 200) ||
							!data
						) {
							throw new Error('Error fetching data');
						}
						(
							target as {
								data: {
									results: {
										[key in string]: T;
									};
								};
							}
						).data.results[url] = data.data.results;

						return data.data.results;
					}
				} catch (e) {
					reject(e);
				}
			});
		},
		set: (target, url: string, value) => {
			target.data.results[url] = value;
			return true;
		}
	}
);

const ApiRequestContext = createContext<
	[ApiRequestContextState<MarvelData>, IActions]
>([
	initialState as ContextStateUninitialized,
	{
		paginate: () => undefined,
		getHeroes: async () => ({} as MarvelHeroesListResponse),
		getHeroComics: async () => ({} as MarvelHeroComicsListResponse)
	}
]);
function getAuthQueryStringParams(): {
	apikey: string;
	ts: string;
	hash: string;
} {
	if (API_PUBLIC_KEY && API_PRIVATE_KEY) {
		return {
			ts: '1000',
			apikey: API_PUBLIC_KEY,
			hash: API_HASH
		};
	} else {
		throw new Error(
			"Couldn't find API public and private keys in project environment"
		);
	}
}

function getPaginationQueryStringParams(
	maxResults: number,
	page: number
): {
	limit: string;
	offset: string;
} {
	const offset = page * maxResults;
	const limit = maxResults;
	return { limit: limit.toString(), offset: offset.toString() };
}

export function CachedRequestsProvider({
	children,
	url,
	maxResultsPerPage
}: Props) {
	const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
		isFetching: false,
		url
	} as ContextStateInitialized);

	const [page, setPage] = useState(0);

	const getNavigatableUrl = useCallback((): string => {
		const newUrl = new URL(url);
		Object.entries({
			...getAuthQueryStringParams(),
			...getPaginationQueryStringParams(maxResultsPerPage, page)
		}).forEach((param) => {
			newUrl.searchParams.append(param[0], param[1]);
		});
		return newUrl.toString();
	}, [page, state]);

	useEffect(() => {
		if (state.isFetching || !state.url) {
			return;
		}

		setState(
			state.url !== url
				? {
						isFetching: true,
						url
				  }
				: {
						...state,
						isFetching: true
				  }
		);

		marvelProxy[getNavigatableUrl()].then((value) => {
			setState({
				...state,
				isFetching: false,
				data: {
					...(state.data ?? {}),
					[url]: value
				}
			} as ContextStateFetched<MarvelData>);
		});
	}, [page, url]);

	const paginate = () => {};
	const getHeroes = () => {
		marvelProxy[getNavigatableUrl()].then((value) => {
			setState({
				...state,
				isFetching: false,
				data: {
					...(state.data ?? {}),
					[url]: value
				}
			} as ContextStateFetched<MarvelData>);
		});
	};
	const getHeroComics = () => ({} as MarvelHeroComicsListResponse);

	return (
		<ApiRequestContext.Provider
			value={[
				state,
				{
					paginate,
					getHeroes,
					getHeroComics
				}
			]}>
			{children}
		</ApiRequestContext.Provider>
	);
}

export const useCachedRequests = (): [
	ApiRequestContextState<MarvelData>,
	IActions
] => {
	return useContext(ApiRequestContext);
};
