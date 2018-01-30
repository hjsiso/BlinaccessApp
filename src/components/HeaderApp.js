import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform
} from 'react-native'

import { Icon } from 'react-native-elements'



const HeaderApp = props => (
   

    < View style = { styles.container } >
        <TouchableWithoutFeedback onPress={() => props.toggle()}>
            <Icon
                name='menu'
                color='#f50'
                size={25}
            />
        </TouchableWithoutFeedback>
        <View style={{ marginLeft: 15 }}>
            <Image
                style={{ height: 20, width: 80 }}
                source={require('../images/logo.png')}
            />
        </View>
        <TouchableWithoutFeedback
            onPress={
                () => props.navigation.navigate('Search')
            }
        >
            <Icon
                name='search'
                color='#f50'
                size={25}
            />
        </TouchableWithoutFeedback>
    </View >

)

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: APPBAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderColor: '#f2f2f2',
        borderBottomWidth: 2,
    }

})

export default HeaderApp
