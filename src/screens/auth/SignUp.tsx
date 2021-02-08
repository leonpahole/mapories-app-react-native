import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, ToastAndroid} from 'react-native';
import * as Yup from 'yup';
import {AuthApiErrors, register} from '../../api/auth.api';
import MyTextInput from '../../components/input/MyTextInput';
import {SocialLoginButtonRow} from '../../components/social/SocialLoginButtonRow';
import {EmptyButton, PrimaryButton} from '../../components/styled/Buttons';
import {
  FormContainer,
  FormikContainer,
} from '../../components/styled/layout/FormContainer';
import {HeadingText} from '../../components/styled/typography/HeadingText';
import {InputError} from '../../components/styled/typography/InputError';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {AuthNavigatorScreens} from '../../navigation/AuthNavigator';

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const navigation = useNavigation();

  return (
    <FormContainer>
      <HeadingText>Sign up</HeadingText>
      <SubtitleText>Create a new Mapories account.</SubtitleText>

      <SocialLoginButtonRow />

      <Formik<{
        email: string;
        name: string;
        password: string;
        confirmPassword: string;
      }>
        initialValues={{
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, {setErrors, resetForm}) => {
          setLoading(true);
          setSignUpError('');

          Keyboard.dismiss();

          try {
            await register(values.email, values.name, values.password);
            ToastAndroid.show(
              "Registration successful. We've sent you a verification e-mail.",
              ToastAndroid.LONG,
            );
            resetForm();
            navigation.navigate(AuthNavigatorScreens.SignIn);
          } catch (e) {
            if (e.message === AuthApiErrors.EMAIL_EXISTS) {
              setErrors({
                email: 'This email is taken.',
              });
            } else {
              setSignUpError('An error has occured, please try again later.');
            }

            console.log('Register error');
            console.log(e);
          }

          setLoading(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please enter a valid e-mail address.')
            .max(250, 'Email should not longer than 250 characters.')
            .required('Please enter your email.'),
          name: Yup.string()
            .min(4, 'Name should be at least 4 characters long.')
            .max(250, 'Name should not longer than 250 characters.')
            .required('Please enter your name.'),
          password: Yup.string()
            .min(4, 'Password should be at least 4 characters long.')
            .max(250, 'Password should not longer than 250 characters.')
            .required('Please enter your password.'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], "Passwords don't match!")
            .required('Please confirm your password!'),
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
              name={'name'}
              label={'Your name'}
              containerStyle={{marginTop: 20}}
            />

            <MyTextInput
              name={'password'}
              label={'Password'}
              containerStyle={{marginTop: 20}}
              autoCapitalize={'none'}
              secureTextEntry
            />

            <MyTextInput
              name={'confirmPassword'}
              label={'Confirm password'}
              containerStyle={{marginTop: 20}}
              autoCapitalize={'none'}
              secureTextEntry
            />

            <InputError style={{marginTop: 10, textAlign: 'center'}}>
              {signUpError}
            </InputError>

            <PrimaryButton
              containerStyle={{marginTop: 30}}
              onPress={handleSubmit}
              disabled={loading}
              loading={loading}>
              Sign up
            </PrimaryButton>

            <EmptyButton
              containerStyle={{marginTop: 15}}
              onPress={() => {
                navigation.navigate(AuthNavigatorScreens.SignIn);
              }}>
              Already have an account?
            </EmptyButton>
          </FormikContainer>
        )}
      </Formik>
    </FormContainer>
  );
};

export {SignUp};
