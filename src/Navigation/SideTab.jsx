import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import { scaleWidth } from '../Constants/dynamicSize';
import DrawerWrapper from './DrawerWrapper';
import { useSelector } from "react-redux";
import { COLORS } from '../Constants/colors';

const Drawer = createDrawerNavigator();
const SideTab = ({ route }) => {
  const fromOTP = route?.params?.fromOTP;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: COLORS.WHITE,
          width: scaleWidth(290),
        },
        sceneContainerStyle: {
          backgroundColor: COLORS.WHITE,
        }
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="DrawerWrapper"
        component={DrawerWrapper}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
export default SideTab;