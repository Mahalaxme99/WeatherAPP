import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import Splash from '../Screens/Auth/Splash';
import OnboardingScreen from '../Screens/OnboardingScreen/OnboardingScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import NewsScreen from '../Screens/NewsScreen/NewsScreen';

const Stack = createNativeStackNavigator();
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_bottom'
        }}
      />
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'simple_push'
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;