import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Animated,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import axios from 'axios';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { IMAGES } from '../../Constants/images';
import { COLORS } from '../../Constants/colors';
const HEIGHT = Dimensions.get("window").height + StatusBar.currentHeight;

type RootStackParamList = {
  Home: undefined;
  News: undefined;
  NewsScreen: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

interface WeatherData {
  main: { temp: number };
  sys: { country: string };
  name: string;
  weather: { description: string }[];
  wind: { speed: number };
}

const getWeatherImage = (description: string) => {
  if (description.includes('rain')) return require('../../assets/smallrain.png');
  if (description.includes('cloud')) return require('../../assets/cloudsun.png');
  if (description.includes('clear')) return require('../../assets/sun.png');
  return require('../../assets/sun.png');
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const WEATHER_API_KEY = '72a5870b88e7cb501789d505e9e1e6b3';

  const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
    const response = await axios.get<WeatherData>(url);
    return response.data;
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        alert('Location permission denied');
        return;
      }

      Geolocation.getCurrentPosition(
        async (position: GeoPosition) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await getWeather(latitude, longitude);
            setWeather(data);
            fadeIn();
          } catch (err) {
            console.error('Weather fetch error:', err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error(error);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    })();
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const weatherImage = getWeatherImage(weather?.weather[0]?.description.toLowerCase() || '');

  return (
    <ImageBackground source={IMAGES.splash} style={styles.backgroundImage} resizeMode='cover' resizeMethod="resize">
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
            <Image source={weatherImage} style={styles.image} resizeMode="contain" />
            <Text style={styles.city}><Text style={{ fontWeight: '500' }}>Place: </Text>{weather?.name}, {weather?.sys?.country}</Text>
            <Text style={styles.temp}><Text style={{ fontWeight: '500', fontSize: normalizeFont(18) }}>Temperature: </Text>{weather?.main?.temp}°C</Text>
            <Text style={styles.wind}>Wind: {weather?.wind?.speed} m/s</Text>
            <Text style={styles.desc}>{weather?.weather[0]?.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewsScreen')}>
              <Text style={styles.wind}>View News</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: scaleWidth(100),
    height: scaleHeight(150),
  },
  city: {
    fontSize: normalizeFont(18),
    color: COLORS.WHITE,
  },
  temp: {
    fontSize: normalizeFont(48),
    color: COLORS.WHITE,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wind: {
    fontSize: normalizeFont(20),
    marginVertical: 5,
    color: COLORS.WHITE,
  },
  desc: {
    fontSize: normalizeFont(24),
    color: COLORS.WHITE,
    marginBottom: scaleWidth(20),
    textTransform: 'capitalize',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: HEIGHT,
  },
  weatherImage: {
    width: scaleWidth(300),
    height: scaleHeight(300),
    borderRadius: scaleHeight(20),
  },
  button: {
    borderRadius: scaleWidth(10),
    backgroundColor: COLORS.GREEN,
    width: scaleWidth(300),
    height: scaleHeight(60),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
