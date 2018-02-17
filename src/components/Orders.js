import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
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


class Orders extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: store.getState().user,
            orders: []
        }


    }

    componentWillMount() {
        this.itemsRef = firebase.database().ref("/");
        this.itemsRef.child(`orders/${store.getState().user.uid}`).once("value", snapshot => {
            let items = snapshot.val();
            let newState = [];

            for (let item in items) {

                newState.push({
                    id: item,
                    startedAt: items[item].startedAt,
                    dateString: moment("/Date(" + items[item].startedAt + ")/").format("DD/MM/YYYY"),
                    amount: numeral(items[item].amount).format('$ 0,0.00'),
                    products: items[item].products,
                    state: items[item].state,
                    icon: items[item].state === 'pending' ? 'work' : 'work',
                    iconColor: items[item].state === 'pending' ? '#b3b3b3' : 'green'
                });
            }

            newState = _.orderBy(newState, ['startedAt'], ['desc']);
            this.setState({
                orders: newState
            });

            console.log(newState)

        })
    }

    componentWillUnmount() {
        this.itemsRef.off();
    }

    render() {
        const { navigate } = this.props.navigation
        
        return (
            < View style={styles.container} >
                <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
                <View style={styles.closeButton}>
                    <TouchableOpacity
                        onPress={
                            () => this.props.navigation.goBack()
                        }
                    >
                        <Icon
                            name='chevron-left'
                            color='#fc6800'
                            size={24}
                        />
                    </TouchableOpacity>
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
                            <Text style={styles.textHeader}>Ordenes</Text>
                            <Text style={styles.textHeader2}>Blinaccess</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollContainer}>
                <List
                        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                    >
                    <FlatList
                        data={this.state.orders}

                        renderItem={({ item }) => (

                            <ListItem
                                roundAvatar
                                title={`${item.amount}`}
                                titleStyle={{ fontSize: 12, color: '#fc6800' }}
                                subtitle={`${item.dateString}`}
                                subtitleStyle={{ color: '#b3b3b3', fontSize: 10, fontWeight: 'bold' }}
                                leftIcon={{ name: item.icon, color: item.iconColor }}
                                badge={{ value: item.products.length, textStyle: { color: 'orange', fontSize: 12 }, containerStyle: { marginTop: 0 } }}
                                keyExtractor={item => item.price}
                                wrapperStyle={{backgroundColor: '#151515'}}
                                containerStyle={{backgroundColor: '#151515', borderBottomWidth: 2, borderBottomColor: '#000'}}
                                rightIcon={{name: 'chevron-right', color: '#b3b3b3'}}
                                underlayColor="#151515"
                                onPress={
                                    () => navigate('OrderDetails', { order: item })
                                }
                            />
                        )}

                        keyExtractor={item => item.id}
                    />
                    </List>
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
        fontSize: 10
    },
    text1: {
        color: '#fc6800',
        fontSize: 12,
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

export default Orders