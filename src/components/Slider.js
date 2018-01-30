import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import ImageSlider from 'react-native-image-slider';
import store from '../store'

const { width } = Dimensions.get('window');


const styles = {
    container: {
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        width
    },
    wrapper: {
        height: 240,
        width
    },
    slide1: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        height: 240,
        width
    },
    slide2: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
        height: 240,
        width
    },
    slide3: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
        height: 240,
        width
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }

}

class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagesSlider: [
                'http://placeimg.com/640/480/any',
                'http://placeimg.com/640/480/any',
                'http://placeimg.com/640/480/any'
            ]
        }
    }

    render() {
        return (
            <ImageSlider images={[
                'http://placeimg.com/640/480/any',
                'http://placeimg.com/640/480/any',
                'http://placeimg.com/640/480/any'
            ]} />

        )
    }



}

export default Slider