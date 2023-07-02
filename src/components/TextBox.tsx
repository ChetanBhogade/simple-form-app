import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import React from 'react';
import {ColorCodes} from '../constants/common';

type TextBoxProps = {
  value: string | undefined;
  handleChange?: (text: string) => void;
  label: String;
  labelStyle?: StyleProp<TextStyle>;
  error?: String | undefined;
  multiline?: boolean | undefined;
  disabled?: boolean | undefined;
};

const TextBox = ({
  handleChange,
  value,
  label,
  labelStyle,
  error,
  multiline,
  disabled,
}: TextBoxProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {disabled ? (
        <Text style={[styles.inputArea, styles.padding12]}>{value}</Text>
      ) : (
        <TextInput
          onChangeText={handleChange}
          value={value}
          multiline={multiline}
          style={styles.inputArea}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  padding12: {
    padding: 12,
  },
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
  },
  container: {
    // borderWidth: 1,
    marginBottom: 8,
  },
});
