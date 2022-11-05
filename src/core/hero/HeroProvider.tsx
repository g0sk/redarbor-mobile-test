import React, { useContext, useState } from 'react';
import { MarvelHero } from 'types';

type ContextValues = {
	hero: MarvelHero | null;
	setHero: (hero: MarvelHero) => void;
};

export const HeroContext: React.Context<ContextValues> =
	React.createContext<ContextValues>({} as ContextValues);

export const useHero = () => {
	const { hero, setHero } = useContext(HeroContext);
	return {
		hero,
		setHero
	};
};

export const HeroProvider: React.FC = ({ children }) => {
	const [hero, setHero] = useState<MarvelHero | null>(null);

	return (
		<HeroContext.Provider
			value={{
				hero,
				setHero
			}}>
			{children}
		</HeroContext.Provider>
	);
};
