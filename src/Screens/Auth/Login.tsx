import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    TextInput,
    StatusBar,
    Text,
    TouchableOpacity,
    BackHandler,
    ImageBackground,
    Animated,
    KeyboardAvoidingView
} from 'react-native';
import * as Yup from 'yup';
import { Icon } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import { COLORS } from '../../Constants/colors';
import { scaleWidth } from '../../Constants/dynamicSize';
import { IMAGES } from '../../Constants/images';

interface LoginFormValues {
    username: string;
    password: string;
}
const handleLogin = async (values: LoginFormValues): Promise<void> => {
    console.log('Logging in with:', values);
};

const Login: React.FC = () => {
    const [secure, setSecure] = useState<boolean>(true);
    const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
    const [formAnim] = useState<Animated.Value>(new Animated.Value(0));
    const [buttonAnim] = useState<Animated.Value>(new Animated.Value(0));
    const [translateY] = useState<Animated.Value>(new Animated.Value(-100));

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                BackHandler.exitApp();
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        const fadeInAnim = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        });

        const slideAnim = Animated.timing(formAnim, {
            toValue: 1,
            duration: 800,
            delay: 300,
            useNativeDriver: true,
        });

        const buttonScaleAnim = Animated.timing(buttonAnim, {
            toValue: 1,
            duration: 500,
            delay: 600,
            useNativeDriver: true,
        });

        const finalAnim = Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        });

        fadeInAnim.start();
        slideAnim.start();
        buttonScaleAnim.start();
        finalAnim.start();

        return () => {
            fadeInAnim.stop();
            slideAnim.stop();
            buttonScaleAnim.stop();
            finalAnim.stop();
        };
    }, []);

    return (
        <ImageBackground source={IMAGES.splash} style={styles.backgroundImage} resizeMode='cover' resizeMethod="resize">
            <StatusBar backgroundColor="transparent" translucent />
            <View style={styles.insideContainer}>
                <View style={styles.bgContainer}>
                    <KeyboardAvoidingView style={styles.scrollView}>
                        <Animated.View style={[{ opacity: fadeAnim }, styles.containView]}>
                            <Text style={[styles.title, { color: COLORS.WHITE }]}>Login</Text>
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validationSchema={Yup.object({
                                    username: Yup.string()
                                        .min(10, 'Username must be at least 15 characters')
                                        .required('Enter the Email address'),
                                    password: Yup.string()
                                        .min(8, 'Password must be at least 8 characters')
                                        .required('Enter the Password'),
                                })}
                                onSubmit={async (
                                    values: LoginFormValues,
                                    { setSubmitting }: FormikHelpers<LoginFormValues>
                                ) => {
                                    await handleLogin(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                    <Animated.View style={{ transform: [{ translateY: formAnim }] }}>
                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.subTitle, { color: COLORS.WHITE }]}>User Name</Text>
                                            <View style={[styles.textInput, { borderColor: COLORS.BORDERCOLOR, backgroundColor: COLORS.WHITE }]}>
                                                <TextInput
                                                    style={[styles.input, { color: COLORS.BLACK }]}
                                                    onChangeText={handleChange('username')}
                                                    onBlur={handleBlur('username')}
                                                    value={values.username}
                                                    placeholder="User Name"
                                                    keyboardType="email-address"
                                                    placeholderTextColor={COLORS.GREY}
                                                    accessibilityLabel="Username Input"
                                                    autoCapitalize="none"
                                                />
                                                <View style={styles.eyeHeight}>
                                                    <Icon
                                                        name="user"
                                                        type="feather"
                                                        size={scaleWidth(22)}
                                                        color={COLORS.BLACK}
                                                        style={{ marginRight: scaleWidth(5) }}
                                                    />
                                                </View>
                                            </View>
                                            {errors.username && <Text style={styles.error}>{errors.username}</Text>}
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.subTitle, { color: COLORS.WHITE }]}>Password</Text>
                                            <View style={[styles.textInput, { borderColor: COLORS.BORDERCOLOR, backgroundColor: COLORS.WHITE }]}>
                                                <TextInput
                                                    style={[styles.input, { color: COLORS.BLACK }]}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    value={values.password}
                                                    placeholder="Password"
                                                    secureTextEntry={secure}
                                                    placeholderTextColor={COLORS.GREY}
                                                    accessibilityLabel="Password Input"
                                                    autoCapitalize="none"
                                                />
                                                <TouchableOpacity
                                                    onPress={() => setSecure(!secure)}
                                                    accessibilityLabel="Toggle Password Visibility"
                                                >
                                                    <View style={styles.eyeHeight}>
                                                        <Icon
                                                            name={secure ? 'eye' : 'eye-with-line'}
                                                            type="entypo"
                                                            size={scaleWidth(22)}
                                                            color={COLORS.BLACK}
                                                            style={{ marginRight: scaleWidth(5) }}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                                        </View>

                                        <TouchableOpacity
                                            style={styles.verifyContainer}
                                            onPress={() => handleSubmit()}
                                            accessibilityLabel="Login"
                                        >
                                            <View style={styles.buttonContainer}>
                                                <Text style={[styles.loginText, { color: COLORS.WHITE }]}>Login</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View>
                                )}
                            </Formik>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;
