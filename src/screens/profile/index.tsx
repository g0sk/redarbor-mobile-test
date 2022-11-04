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
import { useAuth } from 'core/AuthProvider';
import { Alert } from 'react-native';
import { VERSION } from '@env';
import { ThemeToggler } from 'components/ThemeToggler';

export const Profile: React.FC = () => {
	const theme = useTheme();
	const { user, signOut } = useAuth();

	const logOut = () => {
		Alert.alert('Cerrar sesión', '¿Está seguro de que desea cerrar sesión?', [
			{
				text: 'Cancelar',
				onPress: () => null
			},
			{
				text: 'Cerrar sesión',
				onPress: () => signOut()
			}
		]);
	};

	return (
		<Screen>
			<View flexDirection="column">
				<NavigationHeader title="Perfil" />
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
								Nombre
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
								Apellidos
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
								Correo electrónico
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
								label="Cerrar sesión"
							/>
						</View>
						<View alignItems="center" margin="l">
							<Text variant="version">{`Versión ${VERSION}`}</Text>
						</View>
					</View>
				</View>
			</View>
		</Screen>
	);
};
