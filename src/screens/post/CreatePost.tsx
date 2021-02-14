import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Keyboard, ToastAndroid, View} from 'react-native';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import * as Yup from 'yup';
import {createPost, updatePicturesForPost} from '../../api/post.api';
import {BackButtonWithOverlay} from '../../components/common/BackButtonWithOverlay';
import MyDatePicker from '../../components/input/MyDatePicker';
import MyRatingPicker from '../../components/input/MyRatingPicker';
import MySwitch from '../../components/input/MySwitch';
import MyTextInput from '../../components/input/MyTextInput';
import {PhotoPicker} from '../../components/input/PhotoPicker';
import {Map} from '../../components/map/Map';
import {PrimaryButton} from '../../components/styled/Buttons';
import {
  FormContainer,
  FormikContainer,
} from '../../components/styled/layout/FormContainer';
import {HeadingText} from '../../components/styled/typography/HeadingText';
import {InputError} from '../../components/styled/typography/InputError';
import {InputLabel} from '../../components/styled/typography/InputLabel';
import {MapLocation} from '../../model/MaporyMapItem';
import {CreateOrUpdatePostData} from '../../model/Post';
import {RootNavigatorScreens} from '../../navigation/RootNavigator';
import {ColorScheme} from '../../styles/colors';

const CreatePost: React.FC = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pictures, setPictures] = useState<string[]>([]);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  return (
    <ScrollView keyboardShouldPersistTaps={'always'}>
      <BackButtonWithOverlay
        textColor={ColorScheme.black}
        backgroundColor={ColorScheme.transparent}
      />
      <View style={{marginTop: 25}}>
        <FormContainer>
          <HeadingText>Create a post</HeadingText>

          <Formik<{
            content: string;
            rating: number;
            placeName: string;
            isMapory: boolean;
            location: MapLocation | undefined;
            dateOfVisit: Date;
          }>
            initialValues={{
              content: '',
              rating: 0,
              placeName: '',
              isMapory: false,
              location: undefined,
              dateOfVisit: new Date(),
            }}
            onSubmit={async (values, {resetForm}) => {
              setLoading(true);

              Keyboard.dismiss();

              try {
                const data: CreateOrUpdatePostData = {
                  content: values.content,
                  mapory: undefined,
                };

                if (values.isMapory) {
                  data.mapory = {
                    latitude: values.location!.latitude,
                    longitude: values.location!.longitude,
                    placeName: values.placeName,
                    rating: values.rating,
                    visitDate: values.dateOfVisit,
                  };
                }

                const newPost = await createPost(data);

                if (pictures.length > 0) {
                  const uploadedPictures = await updatePicturesForPost(
                    newPost.post.id,
                    pictures,
                  );
                  newPost.post.images = uploadedPictures.map((url) => ({
                    url,
                  }));
                }

                ToastAndroid.show('Post created.', ToastAndroid.LONG);
                resetForm();
                navigation.pop();
                route.params?.onCreatePost &&
                  route.params.onCreatePost(newPost);
              } catch (e) {
                ToastAndroid.show(
                  'An error has occurred. Please try again later.',
                  ToastAndroid.LONG,
                );
                console.log('Create post error');
                console.log(e);
              }

              setLoading(false);
            }}
            validationSchema={Yup.object().shape({
              content: Yup.string()
                .max(1000, 'Content should not longer than 1000 characters.')
                .required('Please enter content.'),
              placeName: Yup.string().when('isMapory', {
                is: true,
                then: Yup.string()
                  .max(
                    200,
                    'Place name should not longer than 1000 characters.',
                  )
                  .required('Please enter place name.'),
              }),
              location: Yup.object().when('isMapory', {
                is: true,
                then: Yup.object().required('Please select location.'),
              }),
              dateOfVisit: Yup.date().when('isMapory', {
                is: true,
                then: Yup.date().required('Please select date of visit.'),
              }),
            })}>
            {({handleSubmit, values, setFieldValue, errors, touched}) => (
              <FormikContainer>
                <MyTextInput
                  name={'content'}
                  label={'Content'}
                  containerStyle={{marginTop: 20}}
                  multiline={true}
                  numberOfLines={4}
                />

                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    marginTop: 15,
                  }}>
                  <MySwitch name={'isMapory'} label={'Include location'} />
                </View>

                {values.isMapory && (
                  <>
                    <MyRatingPicker
                      name={'rating'}
                      label={'Rating'}
                      containerStyle={{marginTop: 15}}
                    />

                    <MyTextInput
                      name={'placeName'}
                      label={'Where are you?'}
                      containerStyle={{marginTop: 15}}
                      placeholder={'Place name...'}
                    />

                    <View style={{marginTop: 10}}>
                      <InputLabel>Tap on map to select location.</InputLabel>
                      {touched.location && errors.location && (
                        <InputError>Please select location.</InputError>
                      )}
                      <Map
                        style={{marginTop: 5}}
                        center={
                          values.location || {latitude: 30, longitude: 31}
                        }
                        zoom={values.location ? 5 : 0}
                        markers={
                          values.location ? [{...values.location, id: '1'}] : []
                        }
                        onPress={() => {
                          navigation.navigate(
                            RootNavigatorScreens.MapLocationPicker,
                            {
                              preselectedLocation: values.location || undefined,
                              onSelect: (l?: MapLocation) => {
                                if (l) {
                                  setFieldValue('location', l);
                                }
                              },
                            },
                          );
                        }}
                      />
                    </View>

                    <MyDatePicker
                      containerStyle={{marginTop: 10}}
                      name={'dateOfVisit'}
                      label={'Date'}
                      maxDate={new Date()}
                    />
                  </>
                )}

                <PhotoPicker
                  onPictureSelected={(uri) => {
                    setPictures([...pictures, uri]);
                  }}
                  onPictureDeleted={(i) => {
                    pictures.splice(i, 1);
                    setPictures([...pictures]);
                  }}
                  pictures={pictures}
                />

                <PrimaryButton
                  containerStyle={{marginTop: 30}}
                  onPress={handleSubmit}
                  disabled={loading}
                  loading={loading}>
                  Post
                </PrimaryButton>
              </FormikContainer>
            )}
          </Formik>
        </FormContainer>
      </View>
    </ScrollView>
  );
};

export {CreatePost};
