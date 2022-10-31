import * as React from 'react';
import { View, Text, Avatar, Button } from 'components';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'theme';

import { useAuth } from 'core/AuthProvider';
import { Alert } from 'react-native';
import { VERSION } from '@env';

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
		<View marginTop="xxl">
			<View marginHorizontal="xl" marginVertical="l">
				<View alignItems="center" marginBottom="xl">
					<Avatar />
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
								<Icon name="user" color={theme.colors.default} size={20} />
							</View>
							<View>
								<Text>{user?.name}</Text>
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
								<Text>{user?.lastName}</Text>
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
								<Text>{user?.email}</Text>
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
	);
};
