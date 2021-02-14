import React, {useState} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {withFormikControl, withTouched} from 'react-native-formik';
import {InputLabel} from '../styled/typography/InputLabel';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyTextInput from './MyTextInput';
import {formatDate} from '../../util/dateUtil';

const MyDatePicker: React.FC<any> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const {setFieldValue, value} = props;

  return (
    <View style={props.containerStyle}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setShow(true);
        }}>
        <View pointerEvents={'none'}>
          <MyTextInput name={props.name} {...props} value={formatDate(value)} />
        </View>
      </Pressable>
      {show && (
        <DateTimePicker
          value={value}
          mode={'date'}
          display={'default'}
          dateFormat={'day month year'}
          maximumDate={props.maxDate}
          onChange={(_, selectedDate) => {
            setShow(false);
            if (selectedDate) {
              setFieldValue(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};

export default withFormikControl(withTouched(MyDatePicker as any)) as any;
