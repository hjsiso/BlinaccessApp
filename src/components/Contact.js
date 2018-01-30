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


const Contact = props => (

    < View style={styles.container} >
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
 
        <Text>Contact</Text>
    </View >

)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515'
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 2
    },

})

export default Contact