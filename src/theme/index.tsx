import * as React from 'react';
import {
	useTheme as useReTheme,
	ThemeProvider as RestyleProvider,
	TextProps,
	BoxProps
} from '@shopify/restyle';

type ThemeType = typeof BaseTheme & {
	textVariants: { [key: string]: TextProps<typeof BaseTheme> };
	buttonVariants: { [key: string]: BoxProps<typeof BaseTheme> };
};

const createTheme = <T extends ThemeType>(themeObject: T): T => themeObject;

const BaseTheme = {
	colors: {
		yellow: '#FFC300',
		purple: 'red',
		darkPurple: '#8e14a3',
		background: '#000b31',
		blue: '#1f155e',
		dark: '#000',
		gray: '#393939',
		lightGray: '#8f8b8b',
		card: '#ffffff',
		darkText: '#000',
		red: '#b9244b',
		lightBlue: '#39b4ed',
		record: '#45c49a',
		chart: '#0caa36',
		orange: '#df7327',
		default: '#9b9b9b',
		disabled: '#716d6d',
		description: '#393939',
		error: '#c90404',
		lightBackground: '#ffffff',
		lightText: '#ffffff',
		placeholderText: '#716d6d',
		primary: 'black',
		primaryLight: '#a389fa',
		secondary: '#ffc107',
		white: '#fff',
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

const theme = createTheme({
	...BaseTheme,
	textVariants: {
		headerTitle: {
			color: 'darkText',
			fontWeight: 'bold',
			fontSize: 30
		},
		cardTitle: {
			color: 'darkText',
			fontWeight: 'bold',
			fontSize: 20
		},
		heroDescription: {
			textAlign: 'justify',
			lineHeight: 26,
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
			color: 'lightText'
		},
		button_secondary: {
			color: 'lightText',
			fontSize: 15
		},
		checkBox: {
			color: 'description',
			fontSize: 12
		},
		header1: {
			color: 'darkText',
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
			fontSize: 19,
			fontWeight: 'bold'
		},
		dataLabel: {
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
			backgroundColor: 'primary'
		},
		secondary: {
			backgroundColor: 'secondary'
		},
		disabled: {
			backgroundColor: 'disabled'
		}
	},
	navigation: {
		dark: false,
		colors: {
			primary: BaseTheme.colors.primary,
			background: BaseTheme.colors.lightBackground,
			card: BaseTheme.colors.card,
			text: BaseTheme.colors.primary,
			notification: BaseTheme.colors.default,
			border: BaseTheme.colors.default
		}
	}
});

export type Theme = typeof theme;
export const useTheme = () => useReTheme<Theme>();
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
	<RestyleProvider theme={theme}>{children}</RestyleProvider>
);
