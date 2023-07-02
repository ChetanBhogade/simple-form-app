import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ColorCodes} from '../constants/common';

type radioButtonPropTypes = {
  value: string | undefined;
  handleChange: (text: string) => void;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  options: Array<string>;
  error?: String | undefined;
};

const RadioButton = ({
  value,
  handleChange,
  label,
  labelStyle,
  options,
  error,
}: radioButtonPropTypes) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.container}>
        {options.map(item => {
          return (
            <TouchableOpacity
              key={item}
              onPress={() => handleChange(item)}
              style={styles.optionWrapper}>
              <View style={[styles.radioWrapper]}>
                {value === item ? <View style={styles.radioSelected} /> : null}
              </View>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  errorText: {
    color: ColorCodes.brown,
    marginLeft: 16,
  },
  container: {
    flexDirection: 'row',
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  label: {
    color: ColorCodes.black,
    marginLeft: 16,
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
  },
  optionWrapper: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: ColorCodes.black,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: ColorCodes.black,
  },
  radioWrapper: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: ColorCodes.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    marginBottom: 16,
  },
});
