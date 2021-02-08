import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {withNextInputAutoFocusForm} from 'react-native-formik';

const FormContainer: React.FC = ({children}) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}>
      <View>{children}</View>
    </ScrollView>
  );
};

const FormikContainer = withNextInputAutoFocusForm(View);

export {FormContainer, FormikContainer};
