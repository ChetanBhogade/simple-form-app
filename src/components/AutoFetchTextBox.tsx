import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ColorCodes, zipCodes} from '../constants/common';
import Autocomplete from 'react-native-autocomplete-input';

type autoFetchTextBoxPropsType = {
  value: string | undefined;
  handleChange: (text: string) => void;
  label: String;
  labelStyle?: StyleProp<TextStyle>;
  error?: String | undefined;
};

const AutoFetchTextBox = ({
  label,
  labelStyle,
  value,
  handleChange,
  error,
}: autoFetchTextBoxPropsType) => {
  const filteredData = zipCodes.filter(item =>
    item.zipcode.includes(value || ''),
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>

      <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={filteredData}
          value={value}
          style={styles.inputArea}
          onChangeText={text => handleChange(text)}
          renderResultList={item => {
            const [data]: Array<any> = new Array(item.data);
            return value?.length && value?.length > 2 && value?.length < 6 ? (
              <View style={styles.listStyleWrapper}>
                {data?.map((_element: (typeof zipCodes)[0]) => {
                  return (
                    <TouchableOpacity
                      key={_element.zipcode}
                      onPress={() => handleChange(_element.zipcode)}>
                      <Text style={styles.suggestionText}>
                        {_element.zipcode}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <></>
            );
          }}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AutoFetchTextBox;

const styles = StyleSheet.create({
  errorText: {
    color: ColorCodes.brown,
    marginLeft: 16,
  },
  suggestionText: {
    color: ColorCodes.black,
    fontSize: 14,
    marginVertical: 6,
  },
  listStyleWrapper: {
    backgroundColor: '#fff',
    padding: 10,
  },
  autocompleteContainer: {
    // flex: 1,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    zIndex: 1,
    color: ColorCodes.black,
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
    color: ColorCodes.black,
    fontSize: 16,
    backgroundColor: ColorCodes.aliceblue,
    paddingLeft: 16,
  },
  container: {
    // borderWidth: 1,
    marginBottom: 8,
  },
});
