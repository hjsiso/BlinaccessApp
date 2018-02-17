import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    StatusBar,
    Dimensions,
    Platform,
} from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import store from '../store'
import _ from "lodash"

const { width, height } = Dimensions.get('window')

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

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
        } else {
            this.setState({ items: [] });
        }

    }

    newPushContent(item) {
        this.props.navigator.push({
            ident: 'Details',
            passProps: {
                item
            }
        })
    }

    render() {
        const { goBack } = this.props.navigation
        const { navigate } = this.props.navigation

        return (
            <View style={styles.container}>
                <MyStatusBar backgroundColor="#151515" barStyle="light-content" />
                <View>
                    <SearchBar
                        
                        style={{ marginTop: 20 }}
                        inputStyle={{ backgroundColor: '#454545', fontSize: 12, color: '#fc6800' }}
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
                                    titleStyle={{ fontSize: 14, color: '#fc6800' }}
                                    subtitle={`$ ${item.price}`}
                                    subtitleStyle={{ color: '#b3b3b3', fontSize: 12, fontWeight: 'bold' }}
                                    avatar={{ uri: item.thumbnail }}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    keyExtractor={item => item.price}
                                    wrapperStyle={{ backgroundColor: '#151515' }}
                                    containerStyle={{ backgroundColor: '#151515', borderBottomWidth: 2, borderBottomColor: '#000' }}
                                    rightIcon={{ name: 'chevron-right', color: '#b3b3b3' }}
                                    underlayColor="#151515"
                                    onPress={() => navigate('Details', { item: item, currentImage: 0 })}
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

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        marginTop: 0,
        backgroundColor: '#151515'
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
})

export default Search