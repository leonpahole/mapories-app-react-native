import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, ToastAndroid, View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {AuthApiErrors, login, onLogin} from '../../api/auth.api';
import MyTextInput from '../../components/input/MyTextInput';
import {SocialLoginButtonRow} from '../../components/social/SocialLoginButtonRow';
import {
  EmptyButton,
  GeneralButton,
  PrimaryButton,
} from '../../components/styled/Buttons';
import {
  FormContainer,
  FormikContainer,
} from '../../components/styled/layout/FormContainer';
import {HeadingText} from '../../components/styled/typography/HeadingText';
import {InputError} from '../../components/styled/typography/InputError';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {AuthNavigatorScreens} from '../../navigation/AuthNavigator';
import {ColorScheme} from '../../styles/colors';

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <FormContainer>
      <HeadingText>Sign in</HeadingText>
      <SubtitleText>Sign in to your Mapories account.</SubtitleText>

      <SocialLoginButtonRow />

      <Formik<{
        email: string;
        password: string;
      }>
        initialValues={{email: '', password: ''}}
        onSubmit={async (values) => {
          setLoading(true);
          setLoginError(null);

          Keyboard.dismiss();

          try {
            const loginRes = await login(values.email, values.password);
            onLogin(loginRes, dispatch);
          } catch (e) {
            if (e.message === AuthApiErrors.ACCOUNT_NOT_VERIFIED) {
              ToastAndroid.show(
                'Please verify your e-mail before logging in.',
                ToastAndroid.LONG,
              );
            } else {
              setLoginError('Login failed. Please check your inputs.');
            }

            console.log('Login error');
            console.log(e);
          }

          setLoading(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please enter a valid e-mail address.')
            .max(250, 'Email should not longer than 250 characters.')
            .required('Please enter your email.'),
          password: Yup.string()
            .min(4, 'Password should be at least 4 characters long.')
            .max(250, 'Password should not longer than 250 characters.')
            .required('Please enter your password.'),
        })}>
        {({handleSubmit}) => (
          <FormikContainer>
            <MyTextInput
              name={'email'}
              label={'Email'}
              containerStyle={{marginTop: 20}}
              autoCapitalize={'none'}
            />

            <MyTextInput
              name={'password'}
              label={'Password'}
              containerStyle={{marginTop: 20}}
              autoCapitalize={'none'}
              secureTextEntry
            />

            <InputError style={{marginTop: 10, textAlign: 'center'}}>
              {loginError}
            </InputError>

            <PrimaryButton
              containerStyle={{marginTop: 30}}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}>
              Sign in
            </PrimaryButton>

            <EmptyButton
              containerStyle={{marginTop: 15, marginBottom: 10}}
              onPress={() => {
                navigation.navigate(AuthNavigatorScreens.SignUp);
              }}>
              Create a new account
            </EmptyButton>

            <GeneralButton
              textColor={ColorScheme.primary}
              containerStyle={{alignItems: 'flex-start'}}
              onPress={() => {
                navigation.navigate(AuthNavigatorScreens.ForgotPassword);
              }}>
              Forgot your password?
            </GeneralButton>

            <GeneralButton
              textColor={ColorScheme.warning}
              containerStyle={{alignItems: 'flex-start'}}
              onPress={() => {
                navigation.navigate(AuthNavigatorScreens.ResendVerifyMail);
              }}>
              Haven't received verification mail?
            </GeneralButton>
          </FormikContainer>
        )}
      </Formik>
    </FormContainer>
  );
};

export {SignIn};
