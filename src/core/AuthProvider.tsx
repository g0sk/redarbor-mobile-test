import * as React from 'react';
import {
	getCredentials,
	removeCredentials,
	removeTheme
} from '../utils/storage/index';

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
	signIn: (data: AuthPayload) => Promise<User>;
	signOut: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

// In case you want to use Auth functions outside React tree
export const AuthRef = React.createRef<AuthContextActions>();

export const useAuth = (): AuthContextType => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used inside an AuthProvider with a value');
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
			return new Promise(async (resolve, reject) => {
				try {
					const credentials = (await getCredentials()) as User;
					if (credentials) {
						if (credentials.email === 'user@user.com') {
							dispatch({ type: 'SIGN_IN', user: credentials });
							resolve(credentials);
						}
					}
				} catch (e) {
					reject(e);
					dispatch({ type: 'SIGN_OUT' });
				}
			});
		};

		initState();
	}, []);

	React.useImperativeHandle(AuthRef, () => authActions);

	const authActions: AuthContextActions = React.useMemo(
		() => ({
			signIn: async ({ user }: AuthPayload): Promise<User> => {
				return new Promise<User>(async (resolve, reject) => {
					try {
						if (user.email === 'user@user.com') {
							dispatch({ type: 'SIGN_IN', user });
							resolve(user);
						} else {
							reject('User not valid');
						}
					} catch (e) {
						reject(e);
					}
				});
			},
			signOut: async () => {
				try {
					await removeCredentials();
				} catch (e) {
					console.error("Couldn't remove credentials from device");
				}
				dispatch({ type: 'SIGN_OUT' });
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
