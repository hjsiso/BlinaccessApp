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
                color='#fc6800'
                size={25}
            />
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row'}}>
            <Image
                style={{ height: 20, width: 17 }}
                source={require('../images/emblema.png')}
            />
        </View>
        <TouchableWithoutFeedback
            onPress={
                () => props.navigation.navigate('Search')
            }
        >
            <Icon
                name='search'
                color='#fc6800'
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
        backgroundColor: '#151515',
       
        borderBottomWidth: 2,
    }

})

export default HeaderApp
