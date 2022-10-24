import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
	BackgroundColorProps,
	BorderProps,
	SpacingProps,
	VariantProps
} from '@shopify/restyle';
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
