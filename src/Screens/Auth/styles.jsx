import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { COLORS } from "../../Constants/colors";
const HEIGHT = Dimensions.get("window").height + StatusBar.currentHeight;

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: HEIGHT,
    },

    insideContainer: {
        flex: 1,
        marginTop: '5%',
    },
    bgContainer: {
        width: '94%',
        backgroundColor: 'rgba(137, 145, 154, 0.1)',
        height: HEIGHT - 120,
        alignSelf: 'center',
        borderRadius: scaleHeight(20),
        marginTop: '20%',
        alignItems:'center'
    },
    scrollView: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
    },
    containView: {
        padding: scaleWidth(10),
        marginTop: '30%'
    },
    title: {
        fontSize: normalizeFont(30),
        paddingVertical: scaleHeight(20),
        fontWeight: '600',
        color: COLORS.WHITE
    },
    inputContainer: {
        marginVertical: scaleHeight(5),
    },
    subTitle: {
        fontSize: normalizeFont(20),
        fontWeight: '600',
    },
    textInput: {
        height: scaleHeight(60),
        borderWidth: 1.5,
        borderRadius: scaleHeight(3),
        marginTop: scaleHeight(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: '130%',
        paddingHorizontal: scaleWidth(10),
        flex: 0.95,
        fontSize: normalizeFont(16),
        fontWeight: '500'
    },
    eyeHeight: {
        width: scaleWidth(55),
        height: scaleHeight(55),
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        color: COLORS.RED,
        fontSize: normalizeFont(16),
    },
    verifyContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scaleHeight(80),

    },
    buttonContainer: {
        borderRadius: scaleWidth(2),
        position: 'absolute',
        backgroundColor: COLORS.CHAT_BLUE,
        width: '100%',
        height: scaleHeight(60),
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: COLORS.WHITE,
        fontSize: normalizeFont(24),
        fontWeight: '600',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#4facfe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
});