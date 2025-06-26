import React, { useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { styles } from './styles';
import { Icon } from 'react-native-elements';
import { scaleWidth } from '../Constants/dynamicSize';


export default function CustomSidebarMenu({ navigation }) {

  const onBackPress = () => {
    Alert.alert('Hold on!', 'Are you sure you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => handleLogout() },
    ]);
    return true;
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: menucolor, borderColor: menucolor }]}>
        <SafeAreaView style={[styles.container, { backgroundColor: menucolor, borderColor: menucolor }]}>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
          />


          <View style={styles.settingsview}>

            {/* <------ Logout button ------> */}
            <TouchableOpacity onPress={() => onBackPress()} style={styles.logoutview}>
              <Icon name="logout" size={scaleWidth(20)} color={COLORS.BLACK} />
              <Text style={[styles.logout, { color: '#000' }]}>
                Logout
              </Text>
            </TouchableOpacity>

          </View>


        </SafeAreaView>
      </View>
    </>
  );
}