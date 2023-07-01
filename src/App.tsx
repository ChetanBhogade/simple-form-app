/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {ColorCodes} from './constants/common';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor={'#ecf0f1'} barStyle={'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.heading}>Simple Form</Text>
        <View style={styles.divider} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
  },
  root: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});

export default App;
