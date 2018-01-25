import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableHighlight,
    ScrollView
} from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import _ from "lodash"
import store from '../store';
import firebase from '../firebase';



class ListTop extends Component {

    constructor() {
        super();
        this.state = {
            currentItem: null,
            items: [],
            allItems: [],
            outstandingProducts: [],
            categories: null,
            categoriesArray: [],
            showEditOpts: false,
            currentOrder: store.getState().filterProducts.order,
            currentCategory: store.getState().filterProducts.category,
            currentSearch: store.getState().filterProducts.searchString,
            visible: false
        };

        this.handleChangeSearch = this.handleChangeSearch.bind(this);


    }

    componentDidMount() {
        const itemsRef = firebase.database().ref("/");
        itemsRef.child("products").on("value", snapshot => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    name: items[item].name,
                    images: items[item].images,
                    description: items[item].description,
                    price: items[item].price,
                    category: items[item].category,
                    outstanding: items[item].outstanding,
                    thumbnail: items[item].images ? items[item].images[0].thumbnail : 'https://firebasestorage.googleapis.com/v0/b/blindaccesapp.appspot.com/o/img%2Flogo-symbol.png?alt=media&token=c01068e4-9b25-4894-b180-cd83770dfdc8'
                });
            }

            newState = _.orderBy(newState, this.state.currentOrder);

            this.setState({
                items: newState,
                allItems: newState
            }, () => { this.filterList() });

            store.dispatch({
                type: "SET_PRODUCT_LIST",
                products: newState
            });

        });

        this.loadCategories();
    }

    loadCategories() {
        const itemsRef = firebase.database().ref("/");
        itemsRef.child("categories").on("value", snapshot => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    categoryName: items[item].categoryName
                });
            }

            this.setState({
                categories: snapshot.val(),
                categoriesArray: newState
            });

            store.dispatch({
                type: "SET_CATEGORY_LIST",
                categories: newState
            })
        });
    }

    handleChangeSearch(e) {
        this.setState({
            currentSearch: e.target.value
        }, () => { this.filterList() });
    }

    filterList() {
        let items = this.state.allItems;
        if (this.state.currentCategory !== "") {
            items = _.filter(items, item => {
                return item.category == this.state.currentCategory;
            });

            this.setState({
                items: items
            });
        }
        if (this.state.currentOrder !== "") {
            this.setState({
                items: _.orderBy(items, this.state.currentOrder)
            });
        }
        if (this.state.currentSearch !== "") {
            items = _.filter(items, item => {
                return (
                    item.name.toLowerCase().search(this.state.currentSearch.toLowerCase()) !== -1
                );
            });
            this.setState({ items: items });
        }

        store.dispatch({
            type: "SET_PRODUCT_FILTER",
            filterProducts: {
                order: this.state.currentOrder,
                category: this.state.currentCategory,
                searchString: this.state.currentSearch
            }
        });

        store.dispatch({
            type: "SET_PRODUCT_LIST",
            products: items
        })

        let outstandingProducts = _.filter(this.state.allItems, item => {
            return item.outstanding == true
        });


        store.dispatch({
            type: "SET_OUTSTANDING_LIST",
            outstandingProducts: outstandingProducts
        })
        this.setState({ outstandingProducts });

    }

    _renderItemImage(item) {
        return (
            <TouchableHighlight
                style={styles.outstandingList}
                key={item.id}
                underlayColor='#fff'>
                <Image key={item.id} style={{ width: 120, height: 180, borderRadius: 10 }} source={{ uri: item.thumbnail }} />
            </TouchableHighlight>
        )
    };

    _renderItemButtom(item) {
        return (
            <TouchableHighlight
                style={styles.categoryButtom}
                key={item.id}
                underlayColor='#fff'>
                <Text style={styles.textButtom}>
                    {item.categoryName}
                </Text>
            </TouchableHighlight>
        )
    };

    _renderItem(item) {
        return (

            <Text style={styles.text}>
                {item.name}
            </Text>

        )
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    render() {
        return (
            <View style={{ flex: 1, marginTop: 0, marginLeft: 0, marginRight: 0 }}>
                <View>
                    <Text style={styles.text}></Text>
                    <FlatList
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        renderItem={({ item }) => this._renderItemImage(item)}
                        data={this.state.outstandingProducts}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                        style={{ padding: 15 }}
                    />
                </View>
                <View>
                    <FlatList
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                        renderItem={({ item }) => this._renderItemButtom(item)}
                        data={this.state.categoriesArray}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                        style={{ padding: 15 }}
                    />
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
                                    subtitleStyle={{ color: 'orange', fontStyle: 'italic' }}
                                    avatar={{ uri: item.thumbnail }}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    keyExtractor={item => item.price}

                                />
                            )}
                            keyExtractor={item => item.id}

                        />
                    </List>
                </ScrollView>
                <Text style={styles.text}></Text>
                <SearchBar
                    lightTheme
                    style={{ marginTop: 20 }}
                    round
                    onChangeText={(text) => this.setState({
                        currentSearch: text
                    }, () => { this.filterList() }) }
                    placeholder='Buscar...' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
    },
    textButtom: {
        color: 'white',
    },
    categoryButtom: {
        padding: 5,
        backgroundColor: 'orange',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 5,
    },
    outstandingList: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 5,
    },


});

export default ListTop