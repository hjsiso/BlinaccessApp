import React, { Component } from 'react'
import {
    View,
    Text,
    Flatlist,
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Platform,
    Alert
} from 'react-native'
import Authorization from '../Authorization'
import store from '../store'
import firebase from '../firebase'
import { SearchBar, Icon, Badge } from 'react-native-elements'
import _ from "lodash"
import Toast from 'react-native-simple-toast';
import numeral from 'numeral'
//HOC Autorizacion
//get current user 
//get current cart ? cart : create
//add item to cart
//del item to cart

const { width, height } = Dimensions.get('window');

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


const CartItem = ({ ...props }) => (
    <View style={styles.textWithIcon}>
        <View style={styles.withIcon}>
            <Text style={styles.textProductName}>{props.product.name}</Text>
            <Text style={styles.textPrice}> {numeral(props.product.price).format('$ 0,0.00')}</Text>
            <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', width: 80 }}>
                <TouchableOpacity
                    onPress={() => {
                        props.parentFlatList.refreshFlatList(props.countItems - 1)
                        store.dispatch({
                            type: "REMOVE_FROM_CART",
                            product: props.product.id
                        });
                    }}
                >

                    <Icon
                        name="remove-circle-outline"
                        color="red"
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.parentFlatList.refreshFlatList(props.countItems + 1)
                        store.dispatch({
                            type: "ADD_TO_CART",
                            product: props.product.id
                        });
                    }}
                >
                    <Icon
                        name="add-circle-outline"
                        color="green"
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {
                    props.navigate('Details', { item: props.product, currentImage: 0 })
                }}
            >
                <Image
                    style={styles.avatar}
                    source={{ uri: props.product.thumbnail }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15, alignContent: 'center' }}
                />
            </TouchableOpacity>
            <Badge
                value={`${props.count}`}
                textStyle={{ color: '#fc6800', fontSize: 10, width: 15, alignContent: 'center' }}
            />
        </View>
    </View>


)

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cartProducts: _.groupBy(store.getState().cart),
            totalAMount: _.sumBy(store.getState().cart, function (o) { return o.price; }),
            products: store.getState().products,
            user: store.getState().user,
            countItems: store.getState().cart.length,
            userProfile: store.getState().userProfile,
            sendOk: false
        }


    }



    componentDidMount() {

        this.unsubscribe = store.subscribe(() => {

            this.setState((prevState) => {
                let newCartProducts = _.groupBy(store.getState().cart)
                let newCartProductsLength = Object.keys(newCartProducts).length
                let prevCartProductsLength = Object.keys(prevState.cartProducts).length

                /*//console.log( `prevCart Length`)
                //console.dir( Object.keys(prevState.cartProducts).length )
                //console.log( `newCart Length`)
                //console.dir( Object.keys(newCartProducts).length)*/
                return {
                    countItems: newCartProductsLength == prevCartProductsLength ? newCartProductsLength : prevCartProductsLength,
                    cartProducts: _.groupBy(store.getState().cart),
                    products: store.getState().products,
                    user: store.getState().user,
                    userProfile: store.getState().userProfile
                }
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    _addItemShoppingCart(item) {
        //console.log(item)
        store.dispatch({
            type: "ADD_TO_CART",
            product: item
        });
        Toast.show('Produto agregado al carrito.')
    }

    _renderHeader() {
        if (Object.keys(this.state.cartProducts).length > 0) {
            return (<View style={styles.headerCart}>
                <View style={{ flexDirection: 'column' }}>
                    <Image
                        style={{ height: 37, width: 32, marginBottom: 5 }}
                        source={require('../images/emblema.png')}
                    />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textHeader}>Shopping Cart</Text>
                    <Text style={styles.textHeader2}>Blinaccess</Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.confirmSend()
                        }}
                        style={styles.categoryButtom}
                        underlayColor='#fff'>
                        <Text style={styles.textButtom}>
                            Enviar
                        </Text>
                        <Icon
                            name="shopping-cart"
                            color="#b3b3b3"
                            size={18}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}></Text>
                </View>
            </View>)
        } else {
            return (<View style={styles.headerCart}>
                <View style={{ flexDirection: 'column' }}>
                    <Image
                        style={{ height: 37, width: 32, marginBottom: 5 }}
                        source={require('../images/emblema.png')}
                    />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textHeader}>Shopping Cart</Text>
                    <Text style={styles.textHeader2}>Blinaccess</Text>
                </View>


            </View>)
        }


    }

    _renderTotals(totalOrderItems, totalOrderAmout) {

        if (Object.keys(this.state.cartProducts).length > 0) {
            return (<View style={styles.textWithIcon}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textHeader2}>Total</Text>
                    <Text style={styles.textHeader}>{numeral(totalOrderAmout).format('$ 0,0.00')}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textHeader2}>Items</Text>
                    <Text style={styles.textHeader}>{totalOrderItems}</Text>
                </View>
            </View>)
        } else {
            if (this.state.sendOk) {
                return (<View style={styles.textWithIcon}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textHeader3}>Estimado Cliente, su orden ha sido enviada con exito</Text>
                        <Text></Text>
                        <Text style={styles.textHeader2}>Nuestros ejecutivos se pondrán en contacto con usted a la brevedad para concretar la compra su orden.</Text>
                    </View>
                </View>)
            } else {
                return (<View style={styles.textWithIcon}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textHeader2}>Su carro esta vacio !</Text>
                    </View>
                </View>)
            }

        }


    }



    _rederCartItem(item) {
        const product = _.find(this.state.products, { 'id': item });

        return (<View style={styles.textWithIcon}>
            <View style={styles.withIcon}>
                <Text style={styles.textProductName}>{product.name}</Text>
                <Text style={styles.textPrice}>{product.price}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', width: 80 }}>
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch({
                                type: "REMOVE_FROM_CART",
                                product: item
                            });
                        }}
                    >

                        <Icon
                            name="remove-circle-outline"
                            color="red"
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch({
                                type: "ADD_TO_CART",
                                product: item
                            });
                        }}
                    >
                        <Icon
                            name="add-circle-outline"
                            color="green"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.avatar}
                    source={{ uri: product.thumbnail }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
                />
                <Badge
                    value={`x${this.state.cartProducts[item].length}`}
                    textStyle={{ color: '#fc6800' }}
                />
            </View>
        </View>)

    }

    refreshFlatList = (countItems) => {
        this.setState((prevState) => {
            return {
                countItems: countItems
            }
        })

    }

    confirmSend() {
        Alert.alert(
            'Enviar Orden',
            '¿ Esta seguro de enviar esta orden ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.sendOder() },
            ],
            { cancelable: false }
        )
    }


    sendOder() {

        if (this.state.userProfile == null) {
            const { navigate } = this.props.navigation
            Toast.show('Para poder procesar su orden, favor complete los datos de su perfil.');
            setTimeout(() => { navigate('SignIn') }, 3000);
            return false
        }

        let totalOrderAmout = 0;
        for (product in this.state.cartProducts) {
            const productDetail = _.find(this.state.products, { 'id': product });
            totalOrderAmout += this.state.cartProducts[product].length * productDetail.price

        }

        const order = {
            amount: totalOrderAmout,
            startedAt: firebase.database.ServerValue.TIMESTAMP,
            products: store.getState().cart,
            state: 'pending'
        }

        const refUserOrder = firebase.database().ref(`orders/${this.state.user.uid}/`)
        refUserOrder.push(order).then(() => {
            store.dispatch({
                type: "INITIALIZE_CART",
                cart: []
            });
            this.setState({
                sendOk: true
            })
        })

    }

    render() {

        const { goBack } = this.props.navigation
        const { navigate } = this.props.navigation
        let arrProducts = []
        let totalOrderAmout = 0;
        let totalOrderItems = 0;
        //convert to array
        for (product in this.state.cartProducts) {
            arrProducts.push(product);
            const productDetail = _.find(this.state.products, { 'id': product });
            totalOrderItems += this.state.cartProducts[product].length
            totalOrderAmout += this.state.cartProducts[product].length * productDetail.price

        }

        return (
            <View style={styles.container}>
                <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => goBack()}
                >
                    <Icon
                        name="chevron-left"
                        color="#fc6800"
                        size={24}
                    />
                </TouchableOpacity>
                <View style={styles.headerContainer}>
                    {this._renderHeader()}
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <FlatList
                        data={arrProducts}

                        renderItem={({ item, index }) => {
                            return (
                                <CartItem navigate={navigate} parentFlatList={this} countItems={this.state.countItems} product={_.find(this.state.products, { 'id': item })} count={this.state.cartProducts[item].length} />
                            )
                        }}
                        keyExtractor={item => item}
                    />

                    {this._renderTotals(totalOrderItems, totalOrderAmout)}

                </ScrollView>

            </View>
        )
    }

}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    closeButton: {
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 5,
        right: 10,
        zIndex: 2
    },
    container: {
        flex: 1,
        width: width,
        height: height,
        marginTop: 0,
        backgroundColor: '#151515'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingHorizontal: 0,
        paddingVertical: 10,
        paddingTop: STATUSBAR_HEIGHT + 10,
        height: 50
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    headerCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    text: {
        color: '#b3b3b3',
        fontSize: 15
    },
    textProductName: {
        color: '#fc6800',
        fontSize: 14
    },
    textPrice: {
        color: '#b3b3b3',
        fontSize: 12,
        alignContent: 'flex-start',
        marginTop: 5
    },
    textHeader: {
        color: '#b3b3b3',
        fontSize: 18,
        marginHorizontal: 10,
        paddingBottom: 0
    },
    textHeader2: {
        color: '#b3b3b3',
        fontSize: 12,
        marginHorizontal: 10,
        paddingBottom: 15
    },
    textHeader3: {
        color: 'green',
        fontSize: 18,
        marginHorizontal: 10,
        paddingBottom: 0
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingRight: 10
    },
    withIcon: {
        flexDirection: 'column',
        marginHorizontal: 10,
        width: width - 130
    },
    scrollContainer: {
        width: width
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
    textButtom: {
        color: '#b3b3b3',
        fontSize: 12,
        marginRight: 5
    },
    categoryButtom: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'green',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        paddingHorizontal: 15,
        marginTop: 0,
    },



})

export default Cart
