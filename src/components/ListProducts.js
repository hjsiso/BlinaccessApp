import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'




class ListProducts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: props.products
        }
    }

    render() {
        return (
            <List>
                <FlatList
                    data={this.state.products}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.name}`}
                            subtitle={item.price}
                            avatar={{ uri: item.thumbnail }}
                        />
                    )}
                />
            </List>

        )
    }
}

export default ListProducts