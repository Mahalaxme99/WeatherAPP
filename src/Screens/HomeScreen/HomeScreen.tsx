import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import axios from 'axios';
import { normalizeFont, scaleWidth } from '../../Constants/dynamicSize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  News: undefined;
};

type HomeScreenNavigationProp =  NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
          console.log("console.log", latitude, longitude);
          try {
            const data = await getWeather(latitude, longitude);
            console.log("cccc",data)
            setWeather(data);
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.temp}>{weather?.main?.temp}°C</Text>
          <Text style={styles.desc}>{weather?.weather[0]?.description}</Text>
          <Button title="View News" onPress={() => navigation.navigate('NewsScreen')} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: normalizeFont(48),
    fontWeight: 'bold',
  },
  desc: {
    fontSize: normalizeFont(24),
    marginBottom: scaleWidth(20),
  },
});
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

