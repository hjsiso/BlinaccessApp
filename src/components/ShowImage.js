import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native'
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window')
const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const ShowImage = props => (

    < View style={styles.container} >
        <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
        <View style={{ marginTop: 60, marginBottom: 120 }}>
            <Image
                style={{ height: '100%', width }}
                source={{ uri: props.navigation.state.params.uri }}
            />
        </View>
        <View style={styles.closeButton}>
            <TouchableOpacity
                onPress={
                    () => props.navigation.goBack()
                }
            >
                <Icon
                    name='chevron-left'
                    color='#fc6800'
                    size={25}
                />
            </TouchableOpacity>
        </View>
    </View >

)

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})

export default ShowImage
