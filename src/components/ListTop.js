import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import _ from "lodash"
import store from '../store';
import firebase from '../firebase';
import numeral from 'numeral'
import Authorization from '../Authorization'

const { width, height } = Dimensions.get('window');

class ListTop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: store.getState().filteredProducts,
            allItems: store.getState().products,
            outstandingProducts: store.getState().outstandingProducts,
            categories: store.getState().categories,
            categoriesArray: store.getState().categoriesArray,
            currentOrder: "name",
            currentCategory: store.getState().filter.category,
            currentSearch: store.getState().filter.searchString,
            toggle: 1000,
            selected: 10000
        };

    }

    componentDidMount() {

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                items: store.getState().filteredProducts,
                allItems: store.getState().products,
                outstandingProducts: store.getState().outstandingProducts,
                currentCategory: store.getState().filter.category,
                categories: store.getState().categories,
                categoriesArray: store.getState().categoriesArray
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    handleChangeCategory(id, index) {
        this.setState({
            toggle: index
        })
        store.dispatch({
            type: "SET_PRODUCT_FILTER",
            filter: {
                order: this.state.currentOrder,
                category: id,
                searchString: this.state.currentSearch
            }
        });




        this.filterList(id);
    }

    filterList(categoryFilter) {
        let items = this.state.allItems;
        //console.log('allItems: ')
        //console.log(items);

        items = _.filter(items, item => {
            return item.topost == true;
        });

        if (categoryFilter !== "") {
            items = _.filter(items, item => {
                return item.category == categoryFilter;
            });

        }
        if (this.state.currentOrder !== "") {
            items = _.orderBy(items, this.state.currentOrder)

        }
        if (this.state.currentSearch !== "") {
            items = _.filter(items, item => {
                return (
                    item.name.toLowerCase().search(this.state.currentSearch.toLowerCase()) !== -1
                );
            });
        }

        store.dispatch({
            type: "SET_FILTERED_LIST",
            filteredProducts: items
        });

        store.dispatch({
            type: "SET_PRODUCT_FILTER",
            filter: {
                order: this.state.currentOrder,
                category: categoryFilter,
                searchString: this.state.currentSearch
            }
        });

    }

    _renderItemImage(item) {
        const { navigate } = this.props.navigation
        return (
            <TouchableOpacity
                onPress={
                    () => navigate('Details', { item: item, currentImage: 0 })
                }
                style={styles.outstandingList}
                key={item.id}
                underlayColor='#fff'>
                <Image key={item.id} style={{ width: 135, height: 135, borderRadius: 10 }} source={{ uri: item.thumbnail }} />
            </TouchableOpacity>
        )
    };

    _renderItemButtom(item, index) {
        return (
            <TouchableOpacity
                onPress={() => this.handleChangeCategory(item.id, index)}
                style={[styles.categoryButtom, this.state.toggle === index && styles.textInputAlt]}
                key={item.id}
                underlayColor='#fff'>
                <Text style={styles.textButtom}>
                    {item.categoryName}
                </Text>
            </TouchableOpacity>
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



    render() {

        const { navigate } = this.props.navigation

        return (
            <View style={{ flex: 1, marginTop: 0, marginLeft: 0, marginRight: 0, backgroundColor: '#151515' }}>
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.textSubTitle}>Destacados</Text>
                    <FlatList
                        horizontal={true}
                        renderItem={({ item }) => this._renderItemImage(item)}
                        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                        data={this.state.outstandingProducts}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                        style={{ padding: 10, paddingVertical: 0 }}
                    />
                </View>
                <View>
                    <FlatList
                        horizontal={true}
                        renderItem={({ item, index }) => this._renderItemButtom(item, index)}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                        data={this.state.categoriesArray}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                        style={{ padding: 10 }}
                    />
                </View>
                <ScrollView>
                    <List
                        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                    >
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => (

                                <ListItem
                                    roundAvatar
                                    title={`${item.name}`}
                                    titleStyle={{ fontSize: 14, color: '#fc6800' }}
                                    subtitle={`${numeral(item.price).format('$ 0,0.00')}`}
                                    subtitleStyle={{ color: '#b3b3b3', fontSize: 12, fontWeight: 'bold' }}
                                    avatar={{ uri: item.thumbnail }}
                                    avatarStyle={{width: 60, height: 60, borderRadius: 30}}
                                    avatarContainerStyle={{width: 80, height: 80}}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    keyExtractor={item => item.price}
                                    wrapperStyle={{ backgroundColor: '#151515' }}
                                    containerStyle={{ backgroundColor: '#151515', borderBottomWidth: 2, borderBottomColor: '#000' }}
                                    rightIcon={{ name: 'chevron-right', color: '#b3b3b3' }}
                                    underlayColor="#151515"
                                    onPress={
                                        () => {
                                            navigate('Details', { item: item, currentImage: 0 })
                                        }
                                    }
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

const styles = StyleSheet.create({
    text: {
        color: 'black',
    },
    textButtom: {
        color: '#fc6800',
        fontSize: 12
    },
    textSubTitle: {
        color: '#fc6800',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10

    },
    categoryButtom: {
        padding: 7,
        backgroundColor: '#454545',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 0,
    },
    outstandingList: {
        borderRadius: 10,
        width: 145,
        height: 145,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        paddingVertical: 5,
        padding: 5,
        marginTop: 5,
        marginBottom: 5
    },
    nameContainer: {
        backgroundColor: 'transparent'
    },
    textInputAlt: {
        backgroundColor: '#454545',
    },
    itemSelected: {
        color: '#fc6800'
    }
});

export default Authorization(ListTop)