import React from 'react';
import { StyleSheet, View,Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';
import { useSelector } from "react-redux";

const DrawerSceneWrapper = ({ children }) => {
  const menucolor = useSelector(state => state.detailSlice.menuBackground);
  const progress = useDrawerProgress();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scaleX: interpolate(progress.value, [0, 1], [1, 0.85], 'clamp'),
      },
      {
        scaleY: interpolate(progress.value, [0, 1], [1, 0.9], 'clamp'),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 30], 'clamp'),
    overflow: 'hidden',
    height: interpolate(progress.value, [0, 1], ['70%', '80%'], 'clamp'),
    borderColor: '#849AA9',
    
  }));

  const stackStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 0.9]),
    borderRadius: 30,
    backgroundColor: '#FAF9F6',
    overflow: 'hidden',
    transform: [
      {
        scaleX: interpolate(progress.value, [0, 1], [1, 0.99], 'clamp'),
      },
      {
        scaleY: interpolate(progress.value, [0, 1], [0.8, 0.8], 'clamp'),
      },
    ],
  }));


  return (
    <View style={[styles.container,{backgroundColor: menucolor}]}>
      <Animated.View style={[styles.childrenContainer, animatedStyle]}>
        {children}
      </Animated.View>
      <Animated.View style={[styles.stack, stackStyle]} />
    </View>
  );
};

export default DrawerSceneWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    zIndex: 0,
    right: 30,
    shadowColor: Platform.OS === 'ios' ? '#fff' : '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 3,
    width: '100%',
  },
  childrenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    shadowColor: Platform.OS === 'ios' ? '#fff' : '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10
  },
});