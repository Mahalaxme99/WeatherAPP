import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Animated,
    StatusBar
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';

type RootStackParamList = {
    Splash: undefined;
    HomeScreen: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Splash'
>;
type Props = {
    navigation: SplashScreenNavigationProp;
};

const Splash: React.FC<Props> = ({ navigation }) => {
    const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
    const scaleAnim = useRef<Animated.Value>(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                navigation.replace('HomeScreen');
            }, 1000);
        });
    }, [fadeAnim, scaleAnim, navigation]);

    return (
        <View style={styles.container}>
               <StatusBar backgroundColor="transparent" translucent />
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}>
                <Text style={styles.title}>Weather App</Text>
            </Animated.View>
        </View>
    );
};

export default Splash;
