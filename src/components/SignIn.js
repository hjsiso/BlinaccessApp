import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Button,
    TextInput
} from 'react-native';
import store from "../store";
import firebase, { auth } from '../firebase'
import { Icon, SocialIcon } from 'react-native-elements'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import Toast from 'react-native-simple-toast';
import { TextInputMask } from 'react-native-masked-text'


const { width, height } = Dimensions.get('window');


/*const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: '#fc6800',
            fontSize: 15,
            marginBottom: 7,
            fontWeight: '300'
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '300'
        }
    },
    textbox: {

        // the style applied wihtout errors
        normal: {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: 17,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#cccccc', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        }
    }
}*/



const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: store.getState().user,
            phone: store.getState().userProfile ? store.getState().userProfile.phone : '',
            company: store.getState().userProfile ? store.getState().userProfile.company : ''
        }



    }

    componentDidMount() {
        //const { parentUnsubscribe } = this.props.navigation.state.params
        // parentUnsubscribe();

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                user: store.getState().user,
                phone: store.getState().userProfile ? store.getState().userProfile.phone : '',
                company: store.getState().userProfile ? store.getState().userProfile.company : ''
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

    saveProfile() {

        const userProfile = {
            name: this.state.user.displayName,
            phone: this.state.phone,
            company: this.state.company,
            email: this.state.user.email,
            photoURL: this.state.user.photoURL
        }

        let tmpPhone = this.state.phone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "");


        const refContact = firebase.database().ref(`contacts/${tmpPhone}`)
        refContact.once("value", snapshot => {
            let contact = snapshot.val();

            //console.dir(snapshot.val())
            return contact;
        }).then((contact) => {
            const { navigate } = this.props.navigation
            if (contact.val()) {
                const refUserProfile = firebase.database().ref(`profiles/${this.state.user.uid}/`)
                refUserProfile.set({ userProfile }).then(() => {
                    store.dispatch({
                        type: "SET_USER_PROFILE",
                        userProfile: userProfile
                    });
                    Toast.show(`Los datos fueron guardados.`);
                    navigate('Home');
                })
            } else {
                Toast.show(`Acceso no permitido.`);
            }
        })



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
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                        />
                        <View style={styles.avatarImage}>
                            <Text style={styles.textWellcome}>{this.state.user.displayName}</Text>
                        </View>
                        <View style={styles.avatarImage}>
                            <Text style={styles.text}>Estimado cliente, para acceder a nuestro catalogo de porductos por favor complete los siguientes datos de su perfil.</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.containerForm}>
                    <Text style={styles.textLabel}>Teléfono</Text>
                    <TextInputMask
                        ref={'phone'}
                        type={'custom'}
                        keyboardType={'numeric'}
                        options={{
                            mask: '(99) 99999-99999',
                            underlineColorAndroid: "#fc6800",
                            selectionColor: "#fc6800"
                        }}
                        style={{ color: '#fc6800', borderBottomWidth: 0, borderColor: '#fc6800' }}
                        underlineColorAndroid="#fc6800"
                        selectionColor="#fc6800"
                        onChangeText={(text) => this.setState({ phone: text })}
                        value={this.state.phone}
                    />
                    <Text style={styles.textLabel}>Empresa</Text>
                    <TextInput
                        ref={'company'}
                        maxLength={50}
                        value={this.state.company}
                        style={{ color: '#fc6800', borderBottomWidth: 0, borderColor: '#fc6800' }}
                        underlineColorAndroid="#fc6800"
                        selectionColor="#fc6800"
                        onChangeText={(text) => this.setState({ company: text })}
                    />
                    <Button
                        title="Guardar"
                        color="green"
                        onPress={this.handleSubmit}
                        style={{ marginTop: 15 }}
                    />
                </View>
            </View>)


        }


    }

    removeNotNumbers(text) {
        return text.replace(/[^0-9]+/g, '');
    }

    handleSubmit = () => {

        if (this.removeNotNumbers(this.state.phone).length < 12) {
            Toast.show(`Por favor complete el numero de teléfono`);
            //this.refs['phone'].getElement().focus()
        } else if (this.state.company === "" || this.state.company.length === 0) {
            Toast.show(`Por favor indique el nombre de su compaña`);
            //this.refs['company'].getElement().focus()
        } else {
            this.saveProfile()
        }


    }

    render() {

        const { goBack } = this.props.navigation
        const { navigate } = this.props.navigation

        return (

            <View style={styles.container}>
                <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
                <View style={styles.closeButton}>
                    <TouchableOpacity
                        onPress={() => navigate('Home')}
                    >
                        <Icon
                            name='chevron-left'
                            color='#fc6800'
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
    containerForm: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
        backgroundColor: '#151515',
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
        marginTop: 5
    },
    avatar: {
        width: 80,
        height: 80,
    },
    avatarImage: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 10
    },
    textWellcome: {
        color: '#fc6800',
        fontSize: 15,
        fontWeight: '300'
    },
    text: {
        color: '#b3b3b3',
        fontSize: 12
    },
    textLabel: {
        color: '#b3b3b3',
        fontSize: 15,
        fontWeight: '300',
        marginBottom: 15,
        marginTop: 5
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
})

export default SignIn