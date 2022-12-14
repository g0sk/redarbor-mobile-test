import SInfo from 'react-native-sensitive-info';
import { ColorTheme, Credentials } from 'types';

const CREDENTIALS: string = 'credentials';
const COLOR_THEME: string = 'theme';

const keyChainOptions: {
	sharedPreferencesName: string;
	keyChainService: string;
} = {
	sharedPreferencesName: 'redarborSharedPrefs',
	keyChainService: 'redarborKeyChain'
};

export async function getItem<T>(key: string): Promise<T | null> {
	const value = await SInfo.getItem(key, keyChainOptions);
	return value ? JSON.parse(value)?.[key] || null : null;
}

export async function setItem<T>(key: string, value: T): Promise<void> {
	SInfo.setItem(key, JSON.stringify({ [key]: value }), keyChainOptions);
}

export async function removeItem<T>(key: string): Promise<void> {
	SInfo.deleteItem(key, keyChainOptions);
}

//Credentials
export const getCredentials = () => getItem<Credentials>(CREDENTIALS);

export const setCredentials = (value: Credentials) =>
	setItem<Credentials>(CREDENTIALS, value);

export const removeCredentials = () => removeItem(CREDENTIALS);

//Theme
export const getTheme = () => getItem<ColorTheme>('theme');
export const setTheme = (value: ColorTheme) =>
	setItem<ColorTheme>(COLOR_THEME, value);
export const removeTheme = () => removeItem(COLOR_THEME);
