import * as React from 'react';
import { getCredentials, removeCredentials } from '../utils/storage/index';

type User = {
	name: string;
	lastName: string;
	email: string;
};

interface AuthState {
	status: 'signOut' | 'signIn';
	user: User | null;
}
type AuthAction = { type: 'SIGN_IN'; user: User } | { type: 'SIGN_OUT' };

type AuthPayload = { user: User };

interface AuthContextActions {
	signIn: (data: AuthPayload) => void;
	signOut: () => void;
	getUserData: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}
const AuthContext = React.createContext<AuthContextType>({
	status: 'signOut',
	user: null,
	signIn: () => {},
	signOut: () => {},
	getUserData: () => {}
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
		user: null
	});

	React.useEffect(() => {
		const initState = async () => {
			//Fetch token, refrestoken and user info (fake call)
			try {
				const credentials = (await getCredentials()) as User;
				if (credentials) {
					if (credentials.email === 'user@user.com') {
						dispatch({ type: 'SIGN_IN', user: credentials });
					}
				}
				dispatch({ type: 'SIGN_OUT' });
			} catch (e) {
				throw e;
			}
		};

		initState();
	}, []);

	React.useImperativeHandle(AuthRef, () => authActions);

	const authActions: AuthContextActions = React.useMemo(
		() => ({
			signIn: async ({ user }: AuthPayload) => {
				dispatch({ type: 'SIGN_IN', user });
			},
			signOut: async () => {
				dispatch({ type: 'SIGN_OUT' });
				try {
					await removeCredentials();
				} catch (e) {
					console.error("Couldn't remove credentials from device");
				}
			},
			getUserData: () => {
				return state.user;
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
				user: action.user
			};
		case 'SIGN_OUT':
			return {
				...prevState,
				status: 'signOut',
				user: null
			};
	}
};
