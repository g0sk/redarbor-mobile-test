import React, { useContext, useState } from 'react';
import { MarvelHero } from 'types';

type ContextValues = {
	Hero: MarvelHero | null;
	setHero: (hero: MarvelHero) => void;
};

export const HeroContext: React.Context<ContextValues> =
	React.createContext<ContextValues>({} as ContextValues);

export const useHero = () => {
	const { Hero, setHero } = useContext(HeroContext);
	return {
		Hero,
		setHero
	};
};

export const HeroProvider: React.FC = ({ children }) => {
	const [Hero, setHero] = useState<MarvelHero | null>(null);

	return (
		<HeroContext.Provider
			value={{
				Hero,
				setHero
			}}>
			{children}
		</HeroContext.Provider>
	);
};
