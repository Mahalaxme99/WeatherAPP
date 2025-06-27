import { Dimensions, Platform, PixelRatio } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');
const ScaleHeight = SCREEN_HEIGHT / 850;
const ScaleWidth = SCREEN_WIDTH / 395;

export function normalizeFont(size:number) {
  const newSize = size ;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1.5;
  } 
}

export const scaleHeight = (height:number) => Math.round(height * ScaleHeight);

export const scaleWidth = (width:number) => Math.round(width * ScaleWidth);