import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import store from "../store";
import firebase, { auth } from '../firebase'
import { Icon, SocialIcon } from 'react-native-elements'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: store.getState().user
        }



    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                user: store.getState().user
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    facebookLogin() {

        return LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (!result.isCancelled) {
                    //console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
  
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
                    //console.dir(currentUser)

                    store.dispatch({
                        type: "SET_AUTH_USER",
                        user: currentUser
                    });
                    this.setState({
                        user: currentUser
                    });
                }
            })
            .catch((error) => {
                // console.log(`Login fail with error: ${error}`)
                Toast.show(`Login fail with error: ${error}`);
            })
    }

    loginGoogle() {
        //console.log(Platform.OS)    
        if (Platform.OS === 'android') {
            // Add configuration settings here:
            GoogleSignin.configure()
                .then(() => {
                    GoogleSignin.signIn()
                        .then((data) => {
                            // create a new firebase credential with the token
                            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
                             //console.dir(credential)
                            // login with credential
                            return firebase.auth().signInWithCredential(credential)
                        })
                        .then((currentUser) => {
                            //console.dir(currentUser)

                            store.dispatch({
                                type: "SET_AUTH_USER",
                                user: currentUser
                            });
                            this.setState({
                                user: currentUser
                            });
                            //console.log(JSON.stringify(currentUser.toJSON()))
                        })
                        .catch((error) => {
                            console.log(`Login fail with error: ${error}`)
                            Toast.show(`Login fail with error: ${error}`);
                        })
                })

        }

        if (Platform.OS === 'ios') {
            GoogleSignin.configure({
                iosClientId: '176221302114-gmf7jqv1qgkc8v8v61f3ekq3cq8nhuup.apps.googleusercontent.com'
            })
                .then(() => {
                    GoogleSignin.signIn()
                        .then((data) => {
                            // create a new firebase credential with the token
                            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
                            //console.dir(data)
                            // login with credential
                            return firebase.auth().signInWithCredential(credential)
                        })
                        .then((currentUser) => {
                            //console.log(currentUser);

                            store.dispatch({
                                type: "SET_AUTH_USER",
                                user: currentUser
                            });

                            this.setState({
                                user: currentUser
                            });
                        })
                        .catch((error) => {
                            //console.log('WRONG SIGNIN', error);
                            Toast.show(`Login fail with error: ${error}`);
                        })
                });
        }

    }

    _renderSignIn() {
        if (!this.state.user) {
            return (<View>

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
                    <SocialIcon
                        title='Inicia sesión con Facebook'
                        button
                        type='facebook'
                        onPress={() => this.facebookLogin()}
                        style={{ paddingHorizontal: 15, width: 230 }}
                    />
                </View>
                <View style={styles.avatarImage}>
                    <Text style={styles.text}>o</Text>
                </View>
                <View style={styles.avatarImage}>
                    <SocialIcon
                        title='Inicia sesión con Google'
                        button
                        type='google'
                        onPress={() => this.loginGoogle()}
                        style={{ paddingHorizontal: 15, width: 230, backgroundColor: '#dd4b39' }}
                    />
                </View>
            </View>

            )

        } else {
            return (<View>

                <View style={styles.avatarContainer}>
                    <View style={styles.avatarImage}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: this.state.user.photoURL }}
                            style={{ width: 80, height: 80, borderRadius: 40 }}
                        />
                    </View>
                </View>
                <View style={styles.avatarImage}>
                    <Text style={styles.text}>Bienvenido, {this.state.user.displayName}</Text>
                </View>

            </View>)


        }


    }

    render() {

        const { goBack } = this.props.navigation

        return (

            <View style={styles.container}>
                <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
                <View style={styles.closeButton}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                    >
                        <Icon
                            name='chevron-left'
                            color='orange'
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                {this._renderSignIn()}
            </View>
        )
    }
}

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
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
})

export default SignIn