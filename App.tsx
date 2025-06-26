import React from 'react';
import { LogBox, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import MainStack from './src/Navigation/MainStack';

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
  console.disableYellowBox = true;

  return (
    <Provider store={store}>
      <NavigationContainer >
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}

