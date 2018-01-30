import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements'

class SignIn extends Component {
    constructor(props) {
        super(props)
 

    }


    render() {

        const { goBack } = this.props.navigation

        return (

            <View style={styles.container}>
                <View style={styles.closeButton}>
                    <TouchableWithoutFeedback
                        onPress={() => goBack()}
                    >
                        <Icon
                            name='close'
                            color='orange'
                            size={25}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <Text>SigIn</Text>
            </View>
        )
    }
}


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

export default SignIn