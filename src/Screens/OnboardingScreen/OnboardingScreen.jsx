import React from 'react';
import {
  StatusBar,
  Alert,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import data from './src/data/data';
import Pagination from './src/components/Pagination';
import CustomButton from './src/components/CustomButton';
import { COLORS } from '../../Constants/colors';
import { scaleHeight,scaleWidth,normalizeFont } from '../../Constants/dynamicSize';

const OnboardingScreen = () => {

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef(null);
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const navigation = useNavigation();
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []), 
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });


  const RenderItem = ({ item, index }) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH, 
          index * SCREEN_WIDTH, 
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0], 
        Extrapolation.CLAMP,
      );

      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );

      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        transform: [{ translateY: translateYAnimation }],
      };
    });

    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );

      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );

      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
      };
    });

    return (
      <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
        <Animated.Image
          source={item.image}
          style={imageAnimationStyle}
          resizeMode={'contain'}
        />
        <Animated.View style={textAnimationStyle}>
          <Text style={styles.itemText}>{item.text}</Text>
        </Animated.View>
      </View>
    );
  };

  const handlenavigation = async () => {
    navigation.navigate("SideTab")
  }
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.skipView} onPress={() => handlenavigation()} accessibilityLabel="Skip">
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: normalizeFont(22),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
    color: COLORS.BLACK
  },
  itemText: {
    textAlign: 'center',
    marginHorizontal: scaleWidth(35),
    color: COLORS.BLACK,
    lineHeight: scaleHeight(20),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(20),
  },
  skipView: {
    flex: 1,
    alignSelf: 'flex-end',
    height: scaleHeight(55)
  },
  skip: {
    textAlign: 'right',
    color: COLORS.BLACK,
    lineHeight: scaleHeight(20),
  }
});
