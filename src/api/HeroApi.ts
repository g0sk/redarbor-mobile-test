import { API_URL } from '@env';
import { apiInstance } from 'api';
import type {
	MarvelHeroComicsListResponse,
	MarvelHeroesListResponse
} from 'types';

export const getHeroes = async (): Promise<
	MarvelHeroesListResponse | undefined
> => {
	const res = await apiInstance
		.get<MarvelHeroesListResponse>(`${API_URL}/v1/public/characters`)
		.then((response) => {
			if (response.ok) {
				return response.data;
			} else {
				throw response.problem;
			}
		})
		.catch((error) => {
			throw error;
		});
	return res;
};
export const getHeroComics = async (
	heroId: number
): Promise<MarvelHeroComicsListResponse | undefined> => {
	const res = await apiInstance
		.get<MarvelHeroComicsListResponse>(
			`${API_URL}/v1/public/characters/${heroId}/comics`
		)
		.then((response) => {
			if (response.ok) {
				return response.data;
			} else {
				throw response.problem;
			}
		})
		.catch((error) => {
			throw error;
		});
	return res;
};
