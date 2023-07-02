import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useState} from 'react';
import {ColorCodes} from '../constants/common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

type datePickerPropsType = {
  value: string | undefined;
  handleChange: (text: string) => void;
  label: String;
  labelStyle?: StyleProp<TextStyle>;
  error?: String | undefined;
};

const DatePicker = ({
  label,
  value,
  error,
  handleChange,
  labelStyle,
}: datePickerPropsType) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: object) => {
    console.log('A date has been picked: ', date);
    handleChange(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Text onPress={showDatePicker} style={styles.inputArea}>
        {value}
      </Text>
      <Text style={styles.errorText}>{error}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  errorText: {
    color: ColorCodes.brown,
    marginLeft: 16,
  },
  label: {
    color: ColorCodes.black,
    marginLeft: 16,
    fontSize: 16,
    marginBottom: 2,
    fontWeight: '500',
  },
  inputArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: ColorCodes.black,
    fontSize: 16,
    paddingVertical: 12,
  },
  container: {
    // borderWidth: 1,
    marginBottom: 8,
  },
});
