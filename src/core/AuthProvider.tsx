import * as React from 'react';
import { removeCredentials } from '../utils/storage/index';

type User = {
	name: string;
	lastName: string;
	email: string;
};

interface AuthState {
	//userToken: string | undefined | null;
	//refreshToken: string | undefined | null;
	status: 'signOut' | 'signIn';
	user: User | null;
}
type AuthAction =
	| { type: 'SIGN_IN'; token: string; refreshToken: string; user: User }
	| { type: 'SIGN_OUT' };

type AuthPayload = { token: string; refreshToken: string; user: User };

interface AuthContextActions {
	signIn: (data: AuthPayload) => void;
	signOut: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}
const AuthContext = React.createContext<AuthContextType>({
	status: 'signOut',
	//userToken: null,
	//refreshToken: null,
	user: null,
	signIn: () => {},
	signOut: () => {}
});

// In case you want to use Auth functions outside React tree
export const AuthRef = React.createRef<AuthContextActions>();

export const useAuth = (): AuthContextType => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be inside an AuthProvider with a value');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = React.useReducer(AuthReducer, {
		status: 'signOut',
		//userToken: null,
		//refreshToken: null,
		user: null
	});

	React.useEffect(() => {
		const initState = async () => {
			try {
				//Fetch token, refrestoken and user info
			} catch (e) {
				throw e;
			}
		};

		initState();
	}, []);

	React.useImperativeHandle(AuthRef, () => authActions);

	const authActions: AuthContextActions = React.useMemo(
		() => ({
			signIn: async ({ token, refreshToken, user }: AuthPayload) => {
				dispatch({ type: 'SIGN_IN', token, refreshToken, user });
			},
			signOut: async () => {
				dispatch({ type: 'SIGN_OUT' });
				try {
					await removeCredentials();
				} catch (e) {
					console.error("Couldn't remove credentials from device");
				}
			}
		}),
		[]
	);

	return (
		<AuthContext.Provider value={{ ...state, ...authActions }}>
			{children}
		</AuthContext.Provider>
	);
};

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'SIGN_IN':
			return {
				...prevState,
				status: 'signIn',
				//userToken: action.token,
				//refreshToken: action.refreshToken,
				user: action.user
			};
		case 'SIGN_OUT':
			return {
				...prevState,
				status: 'signOut',
				//userToken: null,
				//refreshToken: null,
				user: null
			};
	}
};
