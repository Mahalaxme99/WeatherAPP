import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import { scaleWidth } from '../Constants/dynamicSize';
import DrawerWrapper from './DrawerWrapper';
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const SideTab = ({ route }) => {
  const fromOTP = route?.params?.fromOTP;
  const menucolor = useSelector(state => state.detailSlice.menuBackground);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: menucolor,
          width: scaleWidth(290),
        },
        sceneContainerStyle: {
          backgroundColor: menucolor,
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