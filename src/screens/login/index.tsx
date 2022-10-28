import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	ImageBackground,
	Dimensions,
	TextInput as RNTextInput
} from 'react-native';
import { Button, CheckBox, Text, TextInput, View } from 'components';
import { getCredentials, setCredentials } from 'utils/storage';
import { useAuth } from 'core/AuthProvider';

export interface FormLoginValues {
	email: string;
	password: string;
	saveCredentials: boolean;
}

const { height, width } = Dimensions.get('window');

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Email invalido').required('Email requerido'),
	password: Yup.string()
		.min(5, 'Mínimo 5 caracteres')
		.max(15, 'Maximo 15 caracteres')
		.required('Contraseña requerida'),
	saveCredentials: Yup.boolean()
});

export const Login: React.FC = () => {
	const { signIn } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const userNameRef = useRef<RNTextInput>(null);
	const passwordRef = useRef<RNTextInput>(null);
	const {
		handleChange,
		handleBlur,
		handleSubmit,
		errors,
		touched,
		values,
		setFieldValue,
		isValid
	} = useFormik({
		validationSchema: LoginSchema,
		initialValues: {
			email: '',
			password: '',
			saveCredentials: true
		},
		onSubmit: (formValues: FormLoginValues) => login(formValues)
	});

	useEffect(() => {
		const init = async () => {
			const credentials = await getCredentials();
			if (credentials) {
				setFieldValue('email', credentials.email);
				setFieldValue('password', 'password123');
			}
		};
		init();
	}, [setFieldValue, userNameRef]);

	const login = ({ email, password, saveCredentials }: FormLoginValues) => {
		setLoading(true);
		if (saveCredentials) {
			setCredentials({ email, name: 'user', lastName: 'larvel' });
		}
		signIn({
			user: { email, name: 'user', lastName: 'larvel' }
		});
	};

	return (
		<View>
			<KeyboardAwareScrollView style={{ height, width }}>
				<ImageBackground
					source={require('../../../assets/images/login-background.jpg')}
					style={{ height, width }}>
					<View paddingVertical="xxl" paddingHorizontal="l">
						<View
							opacity={1}
							borderRadius={30}
							backgroundColor="lightBackground"
							alignContent="center"
							marginTop="xl"
							marginHorizontal="s"
							padding="l">
							<Text variant="header1" textAlign="center" marginBottom="l">
								Bienvenido a Larvel
							</Text>
							<Text variant="description" textAlign="center">
								Para estar actualizado con la última información del universo
								larvel, inicia sesión
							</Text>
							<View>
								<View marginVertical="m" marginHorizontal="s">
									<TextInput
										icon="mail"
										ref={userNameRef}
										placeholder="Introducir email"
										autoCapitalize="none"
										autoComplete="email"
										value={values.email}
										onChangeText={handleChange('email')}
										onBlur={handleBlur('username')}
										error={errors.email}
										touched={touched.email}
										returnKeyLabel="next"
										onSubmitEditing={() => passwordRef.current?.focus()}
									/>
									<View marginTop="m">
										<TextInput
											ref={passwordRef}
											icon="lock"
											placeholder="Introducer contraseña"
											secureTextEntry={true}
											autoCapitalize="none"
											value={values.password}
											autoComplete="password"
											onChangeText={handleChange('password')}
											onBlur={handleBlur('password')}
											error={errors.password}
											touched={touched.password}
											returnKeyLabel="go"
											onSubmitEditing={() => handleSubmit()}
										/>
									</View>
									<View paddingTop="m" paddingHorizontal="s">
										<CheckBox
											checked={values.saveCredentials}
											label="Recordarme"
											onChange={() =>
												setFieldValue(
													'saveCredentials',
													!values.saveCredentials
												)
											}
										/>
									</View>
								</View>
								<View marginHorizontal="m">
									<Button
										disabled={!isValid}
										variant={isValid ? 'primary' : 'disabled'}
										label="Iniciar sesión"
										onPress={() => handleSubmit()}
										loading={loading}
									/>
								</View>
							</View>
						</View>
					</View>
				</ImageBackground>
			</KeyboardAwareScrollView>
		</View>
	);
};
