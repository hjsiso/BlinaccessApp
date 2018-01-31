import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native'
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window')


const ShowImage = props => (

    < View style={styles.container} >

        <View style={{ marginTop: 100, marginBottom: 120 }}>
            <Image
                style={{ height: '100%', width }}
                source={{ uri: props.navigation.state.params.uri }}
            />
        </View>
        <View style={styles.closeButton}>
            <TouchableWithoutFeedback
                onPress={
                    () => props.navigation.goBack()
                }
            >
                <Icon
                    name='close'
                    color='orange'
                    size={25}
                />
            </TouchableWithoutFeedback>
        </View>
    </View >

)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515'
    },
    closeButton: {
        position: 'absolute',
        top: 45,
        right: 10,
        zIndex: 2
    },

})

export default ShowImage
