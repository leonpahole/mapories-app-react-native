import React from 'react';
import {Switch, View} from 'react-native';
import {withFormikControl} from 'react-native-formik';
import {ColorScheme} from '../../styles/colors';
import {InputLabel} from '../styled/typography/InputLabel';

const MySwitch: React.FC<any> = (props) => {
  const {value, setFieldValue} = props as any;

  return (
    <View
      style={[
        {
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        },
        props.containerStyle,
      ]}>
      <View style={{marginBottom: 5}}>
        <InputLabel>{props.label}</InputLabel>
      </View>
      <Switch
        trackColor={{
          false: ColorScheme.gray,
          true: ColorScheme.primary,
        }}
        thumbColor={'#f4f3f4'}
        onValueChange={() => {
          setFieldValue(!value);
        }}
        value={value}
      />
    </View>
  );
};

export default withFormikControl(MySwitch as any) as any;
