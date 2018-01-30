import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Platform,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    ImageBackground,
    Animated,
    Vibration,
    FlatList
} from 'react-native'
import { Icon } from 'react-native-elements'
import store from '../store'
import _ from 'lodash'
import TextGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')




class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            measuresTitle: 0,
            measuresSeason: 0,
            scrollY: new Animated.Value(0),
            categories: store.getState().categories,
            currentImage: 0,
        }

    }




    _renderItemImage(item, index) {
        const { navigate } = this.props.navigation

        if (item) {
            return (
                <TouchableHighlight
                    onPress={
                        () => navigate('ShowImage', { uri: item.original })
                    }
                    underlayColor='#fff'>
                    <Image key={item.id} style={{ width: 32, height: 32, borderRadius: 10, borderColor: 'orange', borderWidth: 1 }} source={{ uri: item.thumbnail }} />
                </TouchableHighlight>
            )
        }

    }

    render() {
        console.log(this.props)


        const { item } = this.props.navigation.state.params
        const { goBack } = this.props.navigation
        const headerNameToggle = this.state.scrollY.interpolate({
            inputRange: [this.state.measuresTitle, this.state.measuresTitle + 1],
            outputRange: [0, 1]
        })

        const categoryName = _.get(this.state.categories, `${item.category}.categoryName`)
        //console.dir(this.state.categories)
        //console.log(`id: ${item.category}`)
        //console.log(`categoryName: ${categoryName}`)
        return (


            <ScrollView style={styles.container}>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Image
                        style={styles.thumbnail}
                        source={{ uri: item.images[this.state.currentImage] ? item.images[this.state.currentImage].original : 'https://firebasestorage.googleapis.com/v0/b/blindaccesapp.appspot.com/o/img%2Flogo-symbol.png?alt=media&token=c01068e4-9b25-4894-b180-cd83770dfdc8' }}
                    />
                </View>
                <TouchableHighlight
                    style={styles.closeButton}
                    onPress={() => goBack()}
                >
                    <Icon
                        name="chevron-left"
                        color="orange"
                        size={24}
                    />
                </TouchableHighlight>
                <View style={styles.header}>
                </View>
                <View style={styles.nameContainer} >
                    <TextGradient colors={['transparent', '#181818', '#181818']}>
                        <Text style={[styles.text, styles.titleShow]}>{item.name}</Text>
                    </TextGradient>
                    {/*  <Text style={[styles.text, styles.subTitleText]}>
                            {_.get(
                                this.state.categories,
                                `${item.category}.categoryName`
                            )}
                        </Text> */}
                </View>
                <View style={styles.descriptionContainer}>
                    <View style={styles.subtitle}>


                        <Icon
                            name="shopping-cart"
                            color="orange"
                            size={25}
                        />
                        <FlatList
                            horizontal={true}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            renderItem={({ item, index }) => this._renderItemImage(item, index)}
                            data={item.images}
                            keyExtractor={(item, index) => index}
                            showsHorizontalScrollIndicator={false}
                            style={{ padding: 10, marginLeft: 15 }}
                        />
                    </View>
                    <View style={styles.description}>
                        <Text style={[styles.text, styles.light]}>{item.description}</Text>
                    </View>
                </View>
            </ScrollView>

        )
    }

}


const resizeMode = 'center';

const styles = StyleSheet.create({
    nameContainer: {
        backgroundColor: 'transparent'
    },
    header: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        height: 260
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 2
    },
    headerText: {
        color: 'black',
        fontSize: 20
    },
    headerWithIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconDown: {
        marginLeft: 5
    },
    titleShow: {
        fontSize: 25,
        paddingLeft: 10,
        marginBottom: 10,
        color: 'orange'
    },
    container: {
        flex: 1,
        backgroundColor: '#181818'
    },
    thumbnail: {
        width: width,
        height: 300
    },
    buttonPlay: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    iconPlay: {
        opacity: 0.7,
        backgroundColor: 'transparent'
    },
    descriptionContainer: {
        paddingHorizontal: 20
    },
    subtitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitleText: {
        marginRight: 20
    },
    text: {
        color: '#b3b3b3',
        fontSize: 16
    },
    shareListIcons: {
        flexDirection: 'row',
        marginVertical: 30
    },
    listIcon: {
        height: 25
    },
    shareIcon: {
        height: 25
    },
    myListIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40
    },
    myShareIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        marginVertical: 10
    },
    light: {
        fontWeight: '200'
    }
})

export default Details