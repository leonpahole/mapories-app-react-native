import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, ToastAndroid} from 'react-native';
import * as Yup from 'yup';
import {forgotPassword} from '../../api/auth.api';
import MyTextInput from '../../components/input/MyTextInput';
import {PrimaryButton} from '../../components/styled/Buttons';
import {
  FormContainer,
  FormikContainer,
} from '../../components/styled/layout/FormContainer';
import {HeadingText} from '../../components/styled/typography/HeadingText';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {AuthNavigatorScreens} from '../../navigation/AuthNavigator';

const ForgotPassword: React.FC = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  return (
    <FormContainer>
      <HeadingText>Forgot password?</HeadingText>
      <SubtitleText>
        Enter your email and we will send you instructions to reset your
        password.
      </SubtitleText>
      <Formik<{
        email: string;
      }>
        initialValues={{email: ''}}
        onSubmit={async (values, {setErrors, resetForm}) => {
          setLoading(true);

          Keyboard.dismiss();

          try {
            await forgotPassword(values.email);
            ToastAndroid.show(
              'E-mail with instructions has been sent.',
              ToastAndroid.LONG,
            );
            resetForm();
            navigation.navigate(AuthNavigatorScreens.SignIn);
          } catch (e) {
            setErrors({
              email: 'An error occured. Please try again later.',
            });
            console.log('Forgot password error');
            console.log(e);
          }

          setLoading(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please enter a valid e-mail address.')
            .max(250, 'Email should not longer than 250 characters.')
            .required('Please enter your email.'),
        })}>
        {({handleSubmit}) => (
          <FormikContainer>
            <MyTextInput
              name={'email'}
              label={'Email'}
              containerStyle={{marginTop: 20}}
              autoCapitalize={'none'}
            />

            <PrimaryButton
              containerStyle={{marginTop: 30}}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}>
              Send reset e-mail
            </PrimaryButton>
          </FormikContainer>
        )}
      </Formik>
    </FormContainer>
  );
};

export {ForgotPassword};
