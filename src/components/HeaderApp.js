import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import { Icon } from 'react-native-elements'



const HeaderApp = props => (

    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.toggle()}>
            <Icon
                name='menu'
                color='#f50'
                size={25}
            />
        </TouchableWithoutFeedback>
        <View style={{ marginLeft: 15 }}>
            <Image
                style={{height: 20, width: 80}}
                source={require('../images/logo.png')}
            />
        </View>
        <TouchableWithoutFeedback onPress={() => props.toggle()}>
            <Icon
                name='shopping-cart'
                color='#f50'
                size={25}
            />
        </TouchableWithoutFeedback>
    </View>

)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderColor: '#f2f2f2',
        borderBottomWidth: 2,
    }

})

export default HeaderApp
