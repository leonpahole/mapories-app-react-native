import {RouteProp, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {onLogin} from '../../api/auth.api';
import {registerSocial} from '../../api/social.api';
import MyTextInput from '../../components/input/MyTextInput';
import {PrimaryButton} from '../../components/styled/Buttons';
import {
  FormContainer,
  FormikContainer,
} from '../../components/styled/layout/FormContainer';
import {HeadingText} from '../../components/styled/typography/HeadingText';
import {InputError} from '../../components/styled/typography/InputError';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {AuthNavigatorParamList} from '../../navigation/AuthNavigator';

type ProfileScreenNavigationProp = RouteProp<
  AuthNavigatorParamList,
  'SetupSocialAccount'
>;

const SetupSocialAccount: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<ProfileScreenNavigationProp>();
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const socialData = route.params.socialData;
  const provider = route.params.provider;
  const accessToken = route.params.accessToken;

  if (!socialData || !provider || !accessToken) {
    return (
      <FormContainer>
        <SubtitleText>Unexpected error has occured.</SubtitleText>
        <SubtitleText>Please try again later.</SubtitleText>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <HeadingText>Finish setting up your account</HeadingText>
      <SubtitleText>
        Hello, {socialData.name}, finish setting up your account by editing and
        confirming data below.
      </SubtitleText>

      <Formik<{
        email: string;
        name: string;
      }>
        initialValues={{email: socialData.email, name: socialData.name}}
        onSubmit={async (values) => {
          setLoading(true);
          setError(null);

          Keyboard.dismiss();

          try {
            const loginRes = await registerSocial(
              values.name,
              provider,
              accessToken,
              socialData.profilePictureUrl,
              undefined,
            );

            onLogin(loginRes, dispatch);
          } catch (e) {
            setError('Unexpected error has occured. Please try again later.');

            console.log('Login error');
            console.log(e);
          }

          setLoading(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(4, 'Name should be at least 4 characters long.')
            .max(250, 'Name should not longer than 250 characters.')
            .required('Please enter your name.'),
        })}>
        {({handleSubmit}) => (
          <FormikContainer>
            <MyTextInput
              name={'email'}
              label={'Email'}
              containerStyle={{marginTop: 20}}
              editable={false}
            />

            <MyTextInput
              name={'name'}
              label={'Your name'}
              containerStyle={{marginTop: 20}}
            />

            <InputError style={{marginTop: 10, textAlign: 'center'}}>
              {error}
            </InputError>

            <PrimaryButton
              containerStyle={{marginTop: 30}}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}>
              Create an account
            </PrimaryButton>
          </FormikContainer>
        )}
      </Formik>
    </FormContainer>
  );
};

export {SetupSocialAccount};
