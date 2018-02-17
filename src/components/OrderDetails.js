import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
    StatusBar,
    ScrollView,
    FlatList
} from 'react-native'
import { List, ListItem, Icon } from 'react-native-elements'
import firebase from '../firebase'
import store from '../store'
import moment from 'moment'
import numeral from "numeral";
import _ from "lodash"

const { width, height } = Dimensions.get('window')

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


class OrderDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: store.getState().user,
            products: store.getState().products,
            order: null
        }


    }

    render() {

        const { order } = this.props.navigation.state.params
        const { navigate } = this.props.navigation
        const orderProducts = _.groupBy(order.products)

        let arrProducts = []
        let totalOrderItems = 0;
        //convert to array
        for (product in orderProducts) {
            const orderProduct = {
                id: product,
                details: _.find(this.state.products, { 'id': product }),
                items: orderProducts[product].length
            }
            arrProducts.push(orderProduct);
            totalOrderItems += orderProducts[product].length

        }

        return (
            < View style={styles.container} >
                <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
                <View style={styles.closeButton}>
                    <TouchableWithoutFeedback
                        onPress={
                            () => this.props.navigation.goBack()
                        }
                    >
                        <Icon
                            name='chevron-left'
                            color='#fc6800'
                            size={24}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.headerContainer}>
                    <View style={styles.headerCart}>
                        <View style={{ flexDirection: 'column' }}>
                            <Image
                                style={{ height: 37, width: 32, marginBottom: 5 }}
                                source={require('../images/emblema.png')}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.textHeader}>Detalle de la Orden</Text>
                            <Text style={styles.textHeader2}>Blinaccess</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Icon 
                                name={order.icon}
                                color={order.iconColor}
                                size={25}
                            />

                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <List
                        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                    >
                        <FlatList
                            data={arrProducts}

                            renderItem={({ item }) => (

                                <ListItem
                                    roundAvatar
                                    avatar={{ uri: item.details.thumbnail }}
                                    title={item.details.name}
                                    titleStyle={{ fontSize: 14, color: '#fc6800', marginLeft: 5 }}
                                    leftIcon={{ name: item.icon, color: item.iconColor }}
                                    badge={{ value: item.items, textStyle: { color: 'orange', fontSize: 12 }, containerStyle: { marginTop: 0 } }}
                                    keyExtractor={item => item}
                                    wrapperStyle={{ backgroundColor: '#151515' }}
                                    containerStyle={{ backgroundColor: '#151515', borderBottomWidth: 2, borderBottomColor: '#000' }}
                                    hideChevron={true}
                                />
                            )}

                            keyExtractor={item => item.id}
                        />
                    </List>
                    <View style={styles.textWithIcon}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.text}>Total</Text>
                            <Text style={styles.text1}>{numeral(order.amount).format('$ 0,0.00')}</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.text}>Fecha</Text>
                            <Text style={styles.text1}>{order.dateString}</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.text}>Items</Text>
                            <Text style={styles.text1}>{totalOrderItems}</Text>
                        </View>
                    </View>
                </ScrollView>

            </View >

        )

    }

}



const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        marginTop: 0,
        backgroundColor: '#151515'
    },
    closeButton: {
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 5,
        right: 10,
        zIndex: 2
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
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
    headerCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
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
    description: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    text: {
        color: '#b3b3b3',
        fontSize: 12
    },
    text1: {
        color: '#fc6800',
        fontSize: 14,
        fontWeight: '400'
    },
    light: {
        fontWeight: '200'
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingRight: 10,
        paddingLeft: 10
    },
})

export default OrderDetails