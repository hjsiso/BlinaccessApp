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
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'

const { width, height } = Dimensions.get('window');


class SignIn extends Component {
    constructor(props) {
        super(props)


    }

    facebookLogin() {


        return LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (!result.isCancelled) {
                    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
                    // get the access token
                    return AccessToken.getCurrentAccessToken()
                }
            })
            .then(data => {
                if (data) {
                    // create a new firebase credential with the token
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                    // login with credential
                    return firebase.auth().signInWithCredential(credential)
                }
            })
            .then((currentUser) => {
                if (currentUser) {
                    console.dir(currentUser)
                }
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`)
            })
    }

    loginGoogle() {

        if (Platform.OS === 'android') {
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

        if (Platform.OS === 'ios') {
            GoogleSignin.configure({
                iosClientId: '176221302114-gmf7jqv1qgkc8v8v61f3ekq3cq8nhuup.apps.googleusercontent.com'
              })
              .then(() => {
                 GoogleSignin.signIn()
                 .then((user) => {
                   console.log(user);
                   this.setState({user: user});
                 })
                 .catch((err) => {
                   console.log('WRONG SIGNIN', err);
                 })
                 .done();
              });
        }

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
                        onPress={() => this.loginGoogle()}
                    >
                        <Icon
                            raised
                            name='heartbeat'
                            type='font-awesome'
                            color='#f50'
                        />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.avatarImage}>
                    <TouchableWithoutFeedback
                        onPress={() => this.facebookLogin()}
                    >
                        <Icon
                            raised
                            name='heartbeat'
                            type='font-awesome'
                            color='blue'
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