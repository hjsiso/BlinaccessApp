import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight
} from 'react-native'

import { Icon, SocialIcon, Badge } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

class Menu extends Component {

    constructor(props) {
        super(props);
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
                    <View style={styles.avatarImage}>
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
                    </View>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            <Text style={styles.text}>Carrito</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                style={styles.rightIconCart}
                                name="shopping-cart"
                                color="orange"
                                size={25}
                            />
                            <Badge
                                value={3}
                                textStyle={{ color: 'orange' }}
                            />
                        </View>
                    </View>
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
                                color="white"
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
                                color="white"
                                size={25}
                            />
                        </View>
                    </TouchableHighlight>
                    {/*this._renderItemsMenu()*/}
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
    }
})

export default Menu