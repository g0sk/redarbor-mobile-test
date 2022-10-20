export type Credentials = {
	name: string;
	lastName: string;
	email: string;
};

//Navigation

export type RootNavigatorParamList = {
	Auth: AuthParamList;
};

export type AuthParamList = {
	Login: undefined;
};
