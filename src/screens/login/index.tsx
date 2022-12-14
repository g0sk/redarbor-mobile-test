import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	ImageBackground,
	Dimensions,
	TextInput as RNTextInput,
	ToastAndroid
} from 'react-native';
import { Button, CheckBox, Text, TextInput, View } from 'components';
import { getCredentials, setCredentials } from 'utils/storage';
import { useAuth } from 'core/auth/AuthProvider';
import { translate } from 'core/i18n';

export interface FormLoginValues {
	email: string;
	password: string;
	saveCredentials: boolean;
}

const { height, width } = Dimensions.get('window');

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email(translate('form.login.field.email.invalidUser'))
		.required(translate('form.login.field.email.required')),
	password: Yup.string()
		.min(5, translate('form.login.field.password.minPassword'))
		.max(15, translate('form.login.field.password.maxPassword'))
		.required(translate('form.login.field.password.required')),
	saveCredentials: Yup.boolean()
});

export const Login: React.FC = () => {
	const { signIn } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const emailRef = useRef<RNTextInput>(null);
	const passwordRef = useRef<RNTextInput>(null);

	const {
		handleChange,
		handleBlur,
		handleSubmit,
		errors,
		setErrors,
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
	}, []);

	const login = ({ email, password, saveCredentials }: FormLoginValues) => {
		console.log('entro');
		setLoading(true);
		signIn({
			user: { email, name: 'user', lastName: 'user' }
		})
			.then(() => {
				if (saveCredentials) {
					setCredentials({ email, name: 'user', lastName: 'user' });
				}
			})
			.catch((errorMessage) => {
				setErrors({ email: translate('form.login.field.email.invalidUser') });
				setLoading(false);
				ToastAndroid.showWithGravity(
					errorMessage,
					ToastAndroid.BOTTOM,
					ToastAndroid.SHORT
				);
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
							backgroundColor="background"
							alignContent="center"
							marginTop="xl"
							marginHorizontal="s"
							padding="l">
							<Text variant="header1" textAlign="center" marginBottom="l">
								{translate('screen.login.header')}
							</Text>
							<Text variant="description" textAlign="center">
								{translate('screen.login.description')}
							</Text>
							<View>
								<View marginVertical="m" marginHorizontal="s">
									<TextInput
										ref={emailRef}
										icon="mail"
										placeholder={translate(
											'form.login.field.email.placeholder'
										)}
										autoCapitalize="none"
										autoCompleteType="email"
										value={values.email}
										onChangeText={handleChange('email')}
										onBlur={handleBlur('email')}
										error={errors.email}
										touched={touched.email}
										returnKeyLabel="next"
										onSubmitEditing={() => passwordRef.current?.focus()}
									/>
									<View marginTop="m">
										<TextInput
											ref={passwordRef}
											icon="lock"
											placeholder={translate(
												'form.login.field.password.placeholder'
											)}
											secureTextEntry={true}
											autoCapitalize="none"
											value={values.password}
											autoCompleteType="password"
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
											label={translate(
												'form.login.field.saveCredentials.rememberMe'
											)}
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
										label={translate('action.login.title')}
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
