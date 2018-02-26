import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
    StatusBar,
    ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const About = props => (


    < View style={styles.container} >
        <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
        <View style={styles.closeButton}>
            <TouchableWithoutFeedback
                onPress={
                    () => props.navigation.goBack()
                }
            >
                <Icon
                    name='chevron-left'
                    color='#fc6800'
                    size={24}
                />
            </TouchableWithoutFeedback>
        </View>
        <View style={styles.headerContainer}>
            <View style={styles.headerCart}>
                <View style={{ flexDirection: 'column' }}>
                    <Image
                        style={{ height: 37, width: 32, marginBottom: 5 }}
                        source={require('../images/emblema.png')}
                    />
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textHeader}>Nosotros</Text>
                    <Text style={styles.textHeader2}>Blinaccess</Text>
                </View>
            </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.description}>
                <Text style={[styles.text, styles.thick]}>
                    {`Somos una empresa venezolana fundada en 2011, comercializadora de materia prima y accesorios para el Blindaje de Vehículos Automotrices.`}
                </Text>
            </View>
            <View style={styles.description}>
                <Text style={[styles.text1, styles.light]}>
                    {`Misión`}
                </Text>
                <Text style={[styles.text, styles.light]}>
                    {`Comercializar y distribuir productos de blindaje automotriz del alta calidad, a los mejores precios y de última tecnología, a través de un excelente servicio y asesoría para su uso e instalaciones, con presencia en Venezuela, Colombia, Centroamérica, México y el Caribe.`}
                </Text>
            </View>
            <View style={styles.description}>
                <Text style={[styles.text1, styles.light]}>
                    {`Visión`}
                </Text>
                <Text style={[styles.text, styles.light]}>
                    {`Empresa reconocida por su excelente calidad, servicio de comercialización, distribución y asesoría de productos de blindaje automotriz en Venezuela, Colombia, Centroamérica, Mexico y el Caribe.`}
                </Text>
            </View>
        </ScrollView>

    </View >

)

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        marginTop: 0,
        backgroundColor: '#151515'
    },
    closeButton: {
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 5,
        right: 10,
        zIndex: 2
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingHorizontal: 0,
        paddingVertical: 10,
        paddingTop: STATUSBAR_HEIGHT + 10,
        height: 50
    },
    headerCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    textHeader: {
        color: '#b3b3b3',
        fontSize: 18,
        marginHorizontal: 10,
        paddingBottom: 0
    },
    textHeader2: {
        color: '#b3b3b3',
        fontSize: 12,
        marginHorizontal: 10,
        paddingBottom: 15
    },
    description: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    text: {
        color: '#b3b3b3',
        fontSize: 14
    },
    text1: {
        color: '#fc6800',
        fontSize: 14,
        fontWeight: '400'
    },
    light: {
        fontWeight: '200'
    },
    thick: {
        fontWeight: '400'
    }
})

export default About