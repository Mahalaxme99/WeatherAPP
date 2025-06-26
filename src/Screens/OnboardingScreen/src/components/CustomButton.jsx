import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../Constants/colors';


const CustomButton = ({ flatListRef, flatListIndex, dataLength }) => {

  const navigation = useNavigation();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(40),
      height: 40,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30, 
      height: 30, 
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1), 
      transform: [
        {
          translateX: flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(-100),
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      style={styles.touchableArea}
      onPress={async () => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          navigation.navigate("SideTab");
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require('../assets/ArrowIcon.png')}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CHAT_BLUE,
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: { color: 'white', fontSize: 16, position: 'absolute' },
  touchableArea: {
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
});
