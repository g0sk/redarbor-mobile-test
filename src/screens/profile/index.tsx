import * as React from 'react';
import {
	Avatar,
	Button,
	NavigationHeader,
	Screen,
	Text,
	View
} from 'components';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'theme';
import { useAuth } from 'core/auth/AuthProvider';
import { Alert } from 'react-native';
import { VERSION } from '@env';
import { ThemeToggler } from 'components/ThemeToggler';
import { translate } from 'core/i18n';

export const Profile: React.FC = () => {
	const theme = useTheme();
	const { user, signOut } = useAuth();

	const logOut = () => {
		Alert.alert(
			translate('action.logOut.title'),
			translate('action.logOut.description'),
			[
				{
					text: translate('action.cancel'),
					onPress: () => null
				},
				{
					text: translate('action.logOut.title'),
					onPress: () => signOut()
				}
			]
		);
	};

	return (
		<Screen>
			<View flexDirection="column">
				<NavigationHeader title={translate('screen.profile.title')} />
				<View marginHorizontal="xl">
					<View alignItems="center" marginTop="m" marginBottom="l">
						<Avatar />
					</View>
					<View
						marginHorizontal="m"
						marginBottom="l"
						marginTop="l"
						alignItems="center">
						<ThemeToggler />
					</View>
					<View flexDirection="column" marginHorizontal="m">
						<View marginBottom="m">
							<Text variant="formLabel" marginBottom="s">
								{translate('form.profile.field.name.label')}
							</Text>
							<View
								height={48}
								flexDirection="row"
								alignItems="center"
								paddingHorizontal="m"
								borderColor="default"
								borderWidth={2}
								borderRadius={12}
								marginBottom="s">
								<View marginRight="m">
									<Icon name="user" color={theme.colors.text} size={20} />
								</View>
								<View>
									<Text variant="formData">{user?.name}</Text>
								</View>
							</View>
						</View>
						<View marginBottom="m">
							<Text variant="formLabel" marginBottom="s">
								{translate('form.profile.field.lastName.label')}
							</Text>
							<View
								height={48}
								flexDirection="row"
								alignItems="center"
								paddingHorizontal="m"
								borderColor="default"
								borderWidth={2}
								borderRadius={12}
								marginBottom="s">
								<View marginRight="m">
									<Icon name="users" color={theme.colors.default} size={20} />
								</View>
								<View>
									<Text variant="formData">{user?.lastName}</Text>
								</View>
							</View>
						</View>
						<View marginBottom="m">
							<Text variant="formLabel" marginBottom="s">
								{translate('form.profile.field.email.label')}
							</Text>
							<View
								height={48}
								flexDirection="row"
								alignItems="center"
								paddingHorizontal="m"
								borderColor="default"
								borderWidth={2}
								borderRadius={12}
								marginBottom="s">
								<View marginRight="m">
									<Icon name="mail" color={theme.colors.default} size={20} />
								</View>
								<View>
									<Text variant="formData">{user?.email}</Text>
								</View>
							</View>
						</View>
						<View marginHorizontal="l" marginVertical="l">
							<Button
								variant="primary"
								onPress={() => logOut()}
								label={translate('action.logOut.title')}
							/>
						</View>
						<View alignItems="center" margin="l">
							<Text variant="version">{`${translate(
								'info.version'
							)} ${VERSION}`}</Text>
						</View>
					</View>
				</View>
			</View>
		</Screen>
	);
};
