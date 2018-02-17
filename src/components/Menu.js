import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'
import store from '../store'
import { auth } from '../firebase'
import { Icon, SocialIcon, Badge } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            cart: store.getState().cart
        }

        store.subscribe(() => {
            this.setState({
                user: store.getState().user,
                cart: store.getState().cart
            });
            //console.log("store:", store.getState());
        });


    }


    _goShoppingCart() {
        const { navigate } = this.props.navigation
        if (this.state.user) {
            navigate('Cart');
        } else {
            //login
            navigate('SignIn');
        }

    }

    _signOut() {

        auth.signOut()
            .then(() => {
                store.dispatch({
                    type: "SET_AUTH_USER",
                    user: null
                });

            })
        this.props.isOpen = false;
    }

    _renderItemsMenu() {
        const genres = ["Home", "Drama", "Action", "Fantasy", "Horror", "Romance", "Crime", "Thriller", "Mystery", "Science-Fiction", "Comedy", "Family", "Music", "Adventure", "Espionage", "Supernatural"]
        const { itemSelectedValue } = this.props
        return genres.map((element, key) => (
            <TouchableHighlight
                key={key}
                style={element == itemSelectedValue ? [styles.items, styles.itemSelected] : styles.noSelectedItems}
                onPress={() => this.props.itemSelected(element)}
            >
                <Text style={styles.text}>{element}</Text>
            </TouchableHighlight>
        ))
    }

    _renderSignOut() {
        const { navigate } = this.props.navigation

        if (this.state.user) {
            return (
                <View>
                    <TouchableHighlight
                        onPress={
                            () => navigate('Orders')
                        }
                    >
                        <View style={styles.textWithIcon}>
                            <View style={styles.withIcon}>
                                <Text style={styles.text}>Mis Ordenes</Text>
                            </View>
                            <Icon
                                style={styles.rightIcon}
                                name="local-shipping"
                                color="#b3b3b3"
                                size={25}
                            />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={
                            () => navigate('SignIn')
                        }
                    >
                        <View style={styles.textWithIcon}>
                            <View style={styles.withIcon}>
                                <Text style={styles.text}>Mi Perfil</Text>
                            </View>
                            <Icon
                                style={styles.rightIcon}
                                name="person"
                                color="#b3b3b3"
                                size={25}
                            />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={
                            () => this._signOut()
                        }
                    >
                        <View style={styles.textWithIcon}>
                            <View style={styles.withIcon}>
                                <Text style={styles.text}>Cerrar Sesion</Text>
                            </View>
                            <Icon
                                style={styles.rightIcon}
                                name="arrow-back"
                                color="#b3b3b3"
                                size={25}
                            />
                        </View>
                    </TouchableHighlight>

                </View>
            )
        }
    }

    _renderAvatar() {
        const { navigate } = this.props.navigation
        //console.log(this.state.user)
        if (this.state.user) {
            return (<View style={styles.avatarImage}>
                <TouchableHighlight
                    onPress={
                        () => navigate('SignIn')
                    }
                >
                    <Image
                        style={styles.avatar}
                        source={{ uri: this.state.user.photoURL }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
                    />

                </TouchableHighlight>
                <Text style={styles.text}>{this.state.user.displayName}</Text>

            </View>)
        } else {
            return (<View style={styles.avatarImage}>
                <TouchableHighlight
                    onPress={
                        () => navigate('SignIn')
                    }
                >
                    <Image
                        style={styles.avatar}
                        source={require('../images/user.png')}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={
                        () => navigate('SignIn')
                    }
                >
                    <Text style={styles.text}>Sign In</Text>
                </TouchableHighlight>
            </View>)
        }

    }



    render() {

        const { navigate } = this.props.navigation


        return (
            <View style={styles.menu}>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '85%',
                        height: 200
                    }}
                >
                    <Image
                        style={{ width: '85%', height: 200 }}
                        source={require('../images/banner.png')}
                    />
                </View>
                <View style={styles.avatarContainer}>
                    {this._renderAvatar()}
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <TouchableHighlight
                        onPress={
                            () => this._goShoppingCart()
                        }
                    >
                        <View style={styles.textWithIcon}>
                            <View style={styles.withIcon}>
                                <Text style={styles.text}>Shopping Cart</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    style={styles.rightIconCart}
                                    name="shopping-cart"
                                    color="#fc6800"
                                    size={25}
                                />
                                <Badge
                                    value={this.state.cart.length}
                                    textStyle={{ color: '#fc6800' }}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={
                            () => navigate('About')
                        }
                    >
                        <View style={styles.textWithIcon}>


                            <View style={styles.withIcon}>
                                <Text style={styles.text}>Nosotros</Text>
                            </View>
                            <Icon
                                style={styles.rightIcon}
                                name="info"
                                color="#b3b3b3"
                                size={25}
                            />



                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={
                            () => navigate('Contact')
                        }
                    >
                        <View style={styles.textWithIcon}>
                            <View style={styles.withIcon}>
                                <Text style={styles.text}>Contacto</Text>
                            </View>
                            <Icon
                                style={styles.rightIcon}
                                name="phone"
                                color="#b3b3b3"
                                size={25}
                            />
                        </View>
                    </TouchableHighlight>
                    {this._renderSignOut()}
                </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: width,
        height: height,
        marginTop: 0,
        backgroundColor: '#151515'
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 2 + 59,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: 200
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    avatarImage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#b3b3b3',
        fontSize: 15
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingRight: 15
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
    },
    scrollContainer: {
        width: width / 2 + 59
    },
    rightIcon: {
        paddingRight: 25,
        marginRight: 65
    },
    rightIconCart: {
        paddingRight: 5,
        marginRight: 5
    },
    iconWithText: {
        marginRight: 10,
        paddingLeft: 20
    },
    items: {
        paddingVertical: 15,
        paddingLeft: 20,
        marginTop: 5
    },
    itemSelected: {
        borderLeftWidth: 5,
        borderColor: 'red'
    },
    noSelectedItems: {
        paddingVertical: 15,
        paddingLeft: 25,
        marginTop: 5
    },
    activityIndicator: {
        position: 'absolute',
        top: height * 0.5,
        left: width * 0.5,
        height: 80,
        width: 80,
        zIndex: 100
    },

})

export default Menu