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

const Contact = props => (

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
                    <Text style={styles.textHeader}>Contacto</Text>
                    <Text style={styles.textHeader2}>Blinaccess</Text>
                </View>
            </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.description}>
                <Text style={[styles.text1, styles.light]}>
                    {`Oficinas`}
                </Text>
                <Text style={[styles.text, styles.light]}>
                    {``}
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
    }
})

export default Contact