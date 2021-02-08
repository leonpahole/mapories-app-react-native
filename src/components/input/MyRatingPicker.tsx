import React from 'react';
import {View} from 'react-native';
import {withFormikControl} from 'react-native-formik';
import StarRating from 'react-native-star-rating';
import {InputLabel} from '../styled/typography/InputLabel';

const MyRatingPicker: React.FC<any> = (props) => {
  const {value, setFieldValue} = props as any;

  return (
    <View style={props.containerStyle}>
      <View style={{marginBottom: 5}}>
        <InputLabel>{props.label}</InputLabel>
      </View>

      <StarRating
        disabled={false}
        maxStars={5}
        rating={value}
        selectedStar={setFieldValue}
      />
    </View>
  );
};

export default withFormikControl(MyRatingPicker as any) as any;
