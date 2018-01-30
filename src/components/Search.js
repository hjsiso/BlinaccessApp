import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import store from '../store'
import _ from "lodash"

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            allItems: store.getState().products,
            categories: null,
            categoriesArray: [],
            currentSearch: '',
        };
        
    }

    filterList() {
        let items = this.state.allItems;

        if (this.state.currentSearch !== "") {
            items = _.filter(items, item => {
                return (
                    item.name.toLowerCase().search(this.state.currentSearch.toLowerCase()) !== -1
                );
            });
            this.setState({ items: items });
        }else{
            this.setState({ items: [] });
        }

    }

    newPushContent(item){
        this.props.navigator.push({
            ident: 'Details',
            passProps: {
                item
            }
        })
    }

    render() {
        const {goBack} = this.props.navigation

        return (
            <View style={{ flex: 1, marginTop: 20, marginLeft: 0, marginRight: 0, backgroundColor: 'white' }}>
                <View>
                <SearchBar
                    lightTheme
                    style={{ marginTop: 20 }}
                    inputStyle={{ backgroundColor: 'orange', fontSize: 12 }}
                    round
                    clearIcon
                    onClearText={() => goBack()}
                    onChangeText={(text) => this.setState({
                        currentSearch: text
                    }, () => { this.filterList() })}
                    placeholder='Buscar...' />
                </View>
                <ScrollView>
                    <List
                        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                    >
                        <FlatList
                            data={this.state.items}
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
                                    onPress={() => this.newPushContent(item)}
                                />
                            )}
                            keyExtractor={item => item.id}

                        />
                    </List>
                </ScrollView>
            </View>
        )
    }

}

export default Search