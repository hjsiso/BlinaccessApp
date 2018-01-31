import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import store from "../store";
import firebase, { auth } from '../firebase'
import { Icon, SocialIcon } from 'react-native-elements'
import { GoogleSignin } from 'react-native-google-signin'

const { width, height } = Dimensions.get('window');


class SignIn extends Component {
    constructor(props) {
        super(props)


    }

    login() {
        // Add configuration settings here:
        GoogleSignin.configure()
            .then(() => {
                GoogleSignin.signIn()
                    .then((data) => {
                        // create a new firebase credential with the token
                        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
                        console.dir(data)
                        // login with credential
                        firebase.auth().signInWithCredential(credential)
                    })
                    .then((currentUser) => {
                        console.dir(currentUser)
                        store.dispatch({
                            type: "SET_AUTH_USER",
                            user: currentUser
                        });
                        //console.log(JSON.stringify(currentUser.toJSON()))
                    })
                    .catch((error) => {
                        console.log(`Login fail with error: ${error}`)
                    })
            })
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
                <View style={styles.avatarContainer}>

                    <View style={styles.avatarImage}>
                        <Image
                            style={styles.avatar}
                            source={require('../images/user.png')}
                        />
                    </View>

                </View>
                <View style={styles.avatarImage}>
                    <Text style={styles.text}>Blinaccess</Text>
                </View>
                <View style={styles.avatarImage}>
                    <TouchableWithoutFeedback
                        onPress={() => this.login()}
                    >
                        <Icon
                            raised
                            name='heartbeat'
                            type='font-awesome'
                            color='#f50'
                        />
                    </TouchableWithoutFeedback>
                </View>
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
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 45
    },
    avatar: {
        width: 80,
        height: 80,
    },
    avatarImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    text: {
        color: '#b3b3b3',
        fontSize: 15
    },
})

export default SignIn