import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ColorCodes, zipCodes} from './constants/common';
import {Formik} from 'formik';
import TextBox from './components/TextBox';
import * as yup from 'yup';
import RadioButton from './components/RadioButton';
import DatePicker from './components/DatePicker';
import AutoFetchTextBox from './components/AutoFetchTextBox';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

const selectColorData = [
  {label: 'aqua', value: '#00ffff'},
  {label: 'antiquewhite', value: '#faebd7'},
  {label: 'blue', value: '#0000ff'},
  {label: 'blueviolet', value: '#8a2be2'},
  {label: 'brown', value: '#a52a2a'},
  {label: 'black', value: '#000000'},
];

const userSchema = yup.object({
  name: yup
    .string()
    .required()
    .matches(
      /^[A-Z' ]+$/,
      'Only capital alphabets, spaces, and apostrophe is allowed',
    ),
  email: yup.string().required().email('Please enter valid email address'),
  mobile: yup
    .string()
    .required()
    .matches(/^\d{4}-\d{6}$/, 'Please enter valid phone number'),
  gender: yup
    .string()
    .required()
    .oneOf(
      ['Male', 'Female', 'Other'],
      'Selecting the gender field is required',
    ),
  dob: yup.string().required(),
  zip: yup.string().required(),
});

function App(): JSX.Element {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allData, setAllData] = useState('');
  const [selectedColor, setSelectedColor] = useState(ColorCodes.black);
  const [isLoading, setIsLoading] = useState(false);
  const [showDataCounter, setShowDataCounter] = useState(0);

  const storeData = async (value: object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-data', jsonValue);
    } catch (e) {
      // saving error
      console.log('got an error: ', e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-data');
      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      // error reading value
      console.log('got an error: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        backgroundColor={ColorCodes.aliceblue}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Simple Form</Text>
        <View style={styles.divider} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{
              name: '',
              email: '',
              mobile: '',
              dob: '',
              gender: '',
              zip: '',
              city: '',
              state: '',
            }}
            validationSchema={userSchema}
            onSubmit={values => {
              console.log('values on submit: ', values);
              const base64Data = base64.encode(JSON.stringify(values));
              setIsLoading(true);
              setIsSubmitted(true);
              storeData(values);
              console.log('after encoding: ', base64);
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                setIsLoading(false);
                Alert.alert('Form Data', base64Data);
              }, 2000);
            }}>
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isValid,
              handleReset,
            }) => (
              <View style={styles.formView}>
                <TextBox
                  value={values.name}
                  handleChange={handleChange('name')}
                  label={'Name'}
                  error={errors.name}
                  labelStyle={{color: selectedColor}}
                />
                <TextBox
                  value={values.email}
                  handleChange={handleChange('email')}
                  label={'Email'}
                  error={errors.email}
                  labelStyle={{color: selectedColor}}
                />
                <TextBox
                  value={values.mobile}
                  handleChange={number => {
                    const digitsOnly = number.replace(/\D/g, '');
                    let formattedNumber = digitsOnly;
                    if (digitsOnly.length > 4) {
                      formattedNumber =
                        digitsOnly.slice(0, 4) + '-' + digitsOnly.slice(4);
                    }
                    handleChange('mobile')(formattedNumber);
                  }}
                  label={'Mobile'}
                  error={errors.mobile}
                  labelStyle={{color: selectedColor}}
                />

                <DatePicker
                  value={values.dob}
                  handleChange={handleChange('dob')}
                  label={'DOB'}
                  error={errors.dob}
                  labelStyle={{color: selectedColor}}
                />

                <RadioButton
                  value={values.gender}
                  handleChange={handleChange('gender')}
                  label={'Gender'}
                  options={['Male', 'Female', 'Other']}
                  error={errors.gender}
                  labelStyle={{color: selectedColor}}
                />

                <AutoFetchTextBox
                  value={values.zip}
                  handleChange={(newValue: string) => {
                    handleChange('zip')(newValue);
                    const selectedZip = zipCodes.find(
                      item => item.zipcode === newValue,
                    );
                    if (selectedZip) {
                      handleChange('city')(selectedZip.city);
                      handleChange('state')(selectedZip.state);
                    }
                  }}
                  label={'Zip'}
                  error={errors.zip}
                  labelStyle={{color: selectedColor}}
                />

                <TextBox
                  value={values.city}
                  label={'City'}
                  disabled
                  labelStyle={{color: selectedColor}}
                />
                <TextBox
                  value={values.state}
                  label={'State'}
                  disabled
                  labelStyle={{color: selectedColor}}
                />

                <TextBox
                  value={
                    (allData || '') +
                    `\nShow Data Click Count: ${showDataCounter}`
                  }
                  label={'Multiline Text Box'}
                  multiline
                  disabled
                  labelStyle={{color: selectedColor}}
                />

                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={selectColorData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select item'}
                  value={selectedColor}
                  itemContainerStyle={{backgroundColor: ColorCodes.blueviolet}}
                  onChange={item => {
                    setSelectedColor(item.value);
                  }}
                />

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid || isSubmitted}
                  style={styles.btnWrapper}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!isSubmitted}
                  onPress={async () => {
                    setShowDataCounter(oldValue => oldValue + 1);
                    setAllData((await getData()) || '');
                  }}
                  style={[styles.btnWrapper, styles.showDataBtn]}>
                  <Text style={[styles.btnText, styles.showDataBtn]}>
                    Show Data
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowDataCounter(0);
                    storeData({});
                    setAllData('');
                    setIsSubmitted(false);
                    handleReset();
                  }}
                  disabled={!isSubmitted}
                  style={[styles.btnWrapper, styles.resetBtn]}>
                  <Text style={[styles.btnText, styles.resetBtn]}>Reset</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
      {isLoading && (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={ColorCodes.azure}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#0000004d',
  },
  dropdown: {
    height: 50,
    borderColor: ColorCodes.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 12,
    color: ColorCodes.black,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: ColorCodes.black,
  },
  placeholderStyle: {
    fontSize: 16,
    color: ColorCodes.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: ColorCodes.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: ColorCodes.black,
  },
  showDataBtn: {
    backgroundColor: ColorCodes.blanchedalmond,
    color: ColorCodes.black,
  },
  resetBtn: {
    backgroundColor: ColorCodes.blueviolet,
  },
  btnText: {
    fontSize: 16,
    color: ColorCodes.aliceblue,
  },
  btnWrapper: {
    // borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorCodes.blue,
    marginVertical: 5,
  },
  formView: {
    marginVertical: 12,
  },
  divider: {
    width: '100%',
    borderTopWidth: 1,
  },
  heading: {
    color: ColorCodes.black,
    fontSize: 26,
    marginVertical: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    // borderWidth: 1,
  },
  root: {
    flex: 1,
    backgroundColor: ColorCodes.aliceblue,
  },
});

export default App;
