import React, { Component } from 'react'
import {
    View,
    Text,
    Flatlist,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native'
import Authorization from '../Authorization'
import store from '../store'
//HOC Autorizacion
//get current user 
//get current cart ? cart : create
//add item to cart
//del item to cart

class Cart extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <ScrollView>
                <List
                    containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                >
                    <FlatList
                        data={store.getState().Cart}
                        renderItem={({ item }) => (
                            <ListItem
                                roundAvatar
                                title={`${item.name}`}
                                titleStyle={{ fontSize: 12 }}
                                subtitle={`$ ${item.price}`}
                                subtitleStyle={{ color: 'orange', fontSize: 14, fontWeight: 'bold' }}
                                avatar={{ uri: item.thumbnail }}
                                containerStyle={{ borderBottomWidth: 0 }}
                                keyExtractor={item => item.price}
                                onPress={
                                    () => navigate('Details', { item: item, currentImage: 0 })
                                }
                            />
                        )}
                        keyExtractor={item => item.id}

                    />
                </List>
            </ScrollView>
        )
    }

}


export default Authorization(Cart)
