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
    Platform
} from 'react-native'
import Authorization from '../Authorization'
import store from '../store'
import { SearchBar, Icon, Badge } from 'react-native-elements'
import _ from "lodash"
import Toast from 'react-native-simple-toast';
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
            <Text style={styles.textPrice}>$ {props.product.price}</Text>
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
            <Image
                style={styles.avatar}
                source={{ uri: props.product.thumbnail }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
            />
            <Badge
                value={`${props.count}`}
                textStyle={{ color: 'orange' }}
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
            countItems: store.getState().cart.length
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
                    user: store.getState().user
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
        return (<View style={styles.headerCart}>

            <Icon
                name="shopping-cart"
                color="orange"
                size={28}
            />

            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textHeader}>Shopping Cart</Text>
                <Text style={styles.textHeader2}>Blindaccess</Text>
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 25 }}>
                <TouchableOpacity

                    style={styles.categoryButtom}
                    underlayColor='#fff'>
                    <Text style={styles.textButtom}>
                        Procesar orden
                    </Text>
                </TouchableOpacity>
                <Text style={styles.textHeader}></Text>
            </View>
        </View>)

    }

    _renderTotals(totalOrderItems, totalOrderAmout) {
        return (<View style={styles.textWithIcon}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textHeader2}>Total</Text>
                <Text style={styles.textHeader}>$ {totalOrderAmout}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textHeader2}>Items</Text>
                <Text style={styles.textHeader}>{totalOrderItems}</Text>
            </View>
        </View>)

    }



    _rederCartItem(item) {
        const product = _.find(this.state.products, { 'id': item });

        return (<View style={styles.textWithIcon}>
            <View style={styles.withIcon}>
                <Text style={styles.textProductName}>{product.name}</Text>
                <Text style={styles.textPrice}>$ {product.price}</Text>
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
                    textStyle={{ color: 'orange' }}
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

    render() {

        const { goBack } = this.props.navigation
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
                        color="orange"
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
                                <CartItem parentFlatList={this} countItems={this.state.countItems} product={_.find(this.state.products, { 'id': item })} count={this.state.cartProducts[item].length} />
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
        paddingHorizontal: 20,
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
        alignItems: 'center',
    },
    text: {
        color: '#b3b3b3',
        fontSize: 15
    },
    textProductName: {
        color: '#b3b3b3',
        fontSize: 12
    },
    textPrice: {
        color: 'orange',
        fontSize: 12,
        alignContent: 'flex-start'
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
        color: 'orange',
        fontSize: 12
    },
    categoryButtom: {
        padding: 5,
        backgroundColor: 'green',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 0,
    },



})

export default Cart
