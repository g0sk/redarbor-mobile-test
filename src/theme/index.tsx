import * as React from 'react';
import {
	useTheme as useReTheme,
	ThemeProvider as RestyleProvider,
	TextProps,
	BoxProps
} from '@shopify/restyle';
import { ColorTheme } from 'types';
import { getTheme, setTheme } from 'utils/storage';
import { Appearance } from 'react-native';

type ThemeType = typeof BaseTheme & {
	textVariants: { [key: string]: TextProps<typeof BaseTheme> };
	buttonVariants: { [key: string]: BoxProps<typeof BaseTheme> };
};

const createTheme = <T extends ThemeType>(themeObject: T): T => themeObject;

const BaseTheme = {
	colors: {
		text: '#000000',
		invertedText: '#ffffff',
		valid: '#01b018',
		header: '#000000',
		background: '#ffffff',
		cardBackground: '#ffffff',
		dark: '#000',
		gray: '#393939',
		lightGray: '#8f8b8b',
		lightText: '#fff',
		darkText: '#000',
		error: '#c90404',
		lightBlue: '#39b4ed',
		default: '#9b9b9b',
		disabled: '#716d6d',
		description: '#393939',
		placeholderText: '#716d6d',
		primary: '#000',
		primaryLight: '#a389fa',
		secondary: '#ffc107',
		white: '#ffffff',
		lightGrey: '#b4b4b4'
	},
	borderRadius: {
		s: 4,
		m: 10,
		l: 25,
		xl: 75
	},
	spacing: {
		ss: 4,
		s: 8,
		m: 16,
		sm: 17,
		dm: 19,
		l: 24,
		xl: 40,
		xxl: 70,
		sxl: 110,
		mxl: 120,
		dxxl: 130
	},
	margin: {
		ss: 5,
		s: 10,
		sm: 28,
		m: 40,
		dm: 55,
		l: 75,
		xl: 400,
		xxl: 450,
		sxl: 500,
		mxl: 600,
		dxxl: 700
	},
	breakpoints: {}
};

export const theme = createTheme({
	...BaseTheme,
	textVariants: {
		themeSelector: {
			color: 'text',
			fontSize: 19,
			fontWeight: 'bold'
		},
		infoLabel: {
			color: 'text',
			fontSize: 16,
			fontWeight: 'bold'
		},
		screenTitle: {
			color: 'text',
			fontSize: 18,
			fontWeight: 'bold'
		},
		headerTitle: {
			color: 'header',
			fontWeight: 'bold',
			fontSize: 30
		},
		cardData: {
			color: 'text',
			fontWeight: 'bold',
			fontSize: 20
		},
		heroDescription: {
			color: 'text',
			textAlign: 'justify',
			lineHeight: 30,
			fontSize: 20
		},
		errorHeader: {
			color: 'darkText',
			fontWeight: 'bold',
			fontSize: 30
		},
		emptyHeader: {
			color: 'darkText',
			fontWeight: 'bold',
			fontSize: 25
		},
		button_disabled: {
			color: 'lightText'
		},
		button_primary: {
			color: 'invertedText',
			fontWeight: 'bold'
		},
		checkBox: {
			color: 'description',
			fontSize: 12
		},
		header1: {
			color: 'header',
			fontWeight: 'bold',
			fontSize: 28
		},
		header2: {
			color: 'darkText',
			fontSize: 24
		},
		listItemPrimary: {
			fontSize: 17,
			fontWeight: 'bold',
			color: 'darkText'
		},
		listItemData: {
			fontSize: 13,
			color: 'darkText'
		},
		formLabel: {
			color: 'text',
			fontSize: 19,
			fontWeight: 'bold'
		},
		formData: {
			color: 'text',
			fontSize: 15,
			fontWeight: 'bold'
		},
		description: {
			color: 'description',
			fontSize: 16,
			lineHeight: 22,
			textAlign: 'justify'
		},
		version: {
			fontSize: 13,
			color: 'description'
		}
	},
	buttonVariants: {
		primary: {
			backgroundColor: 'text'
		},
		secondary: {
			backgroundColor: 'secondary'
		},
		disabled: {
			backgroundColor: 'disabled'
		}
	},
	navigation: {
		dark: true
	}
});
export const darkTheme: Theme = {
	...theme,
	colors: {
		text: '#ffffff',
		invertedText: '#000000',
		valid: '#01b018',
		header: '#ffffff',
		background: '#000000',
		cardBackground: '#ffffff',
		dark: '#000',
		gray: '#393939',
		lightGray: '#8f8b8b',
		lightText: '#fff',
		darkText: '#000',
		error: '#c90404',
		lightBlue: '#39b4ed',
		default: '#9b9b9b',
		disabled: '#716d6d',
		description: '#fff',
		placeholderText: '#716d6d',
		primary: '#000',
		primaryLight: '#a389fa',
		secondary: '#ffc107',
		white: '#ffffff',
		lightGrey: '#b4b4b4'
	}
};

export type Theme = typeof theme;
export const useTheme = () => useReTheme<Theme>();

type ContextValues = {
	colorTheme: ColorTheme;
	setColorTheme: (theme: ColorTheme) => void;
};

const ThemeContext: React.Context<ContextValues> =
	React.createContext<ContextValues>({} as ContextValues);

export const useColorTheme = () => {
	const { colorTheme, setColorTheme } = React.useContext(ThemeContext);
	return {
		colorTheme,
		setColorTheme
	};
};

export const ThemeProvider: React.FC = ({ children }) => {
	const [colorTheme, setColorTheme] = React.useState<ColorTheme>('light');

	React.useEffect(() => {
		const retrieveSavedTheme = async () => {
			const savedTheme = await getTheme();
			if (savedTheme !== null) {
				setColorTheme(savedTheme);
			} else {
				let colorScheme = Appearance.getColorScheme() as ColorTheme;
				setColorTheme(colorScheme);
				setTheme(colorScheme);
			}
		};
		retrieveSavedTheme();
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				colorTheme,
				setColorTheme
			}}>
			<RestyleProvider theme={colorTheme === 'light' ? theme : darkTheme}>
				{children}
			</RestyleProvider>
		</ThemeContext.Provider>
	);
};
