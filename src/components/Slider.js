import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import store from '../store'

const { width } = Dimensions.get('window');

const Slider = props => (
    <View style={styles.container}>
        <Image style={styles.image} source={props.uri} />
    </View>

)


const styles = {
    container: {
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        width
    },
    wrapper: {
        height:240,
        width
    },
    slide1: {

      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
      height:240,
      width
    },
    slide2: {

      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
      height:240,
      width
    },
    slide3: {
  
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
      height:240,
      width
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }

}

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagesSlider: [
                'http://noticiasclave.com.do/wp-content/uploads/2017/02/Curiosidades-sobre-la-Torre-Eiffel-1.jpg',
                'http://noticiasclave.com.do/wp-content/uploads/2017/03/3.jpg',
                'http://noticiasclave.com.do/wp-content/uploads/2017/02/16819345_1355473277808995_2685963273844957233_o.jpg'
            ]
        }
    }

    render() {
        return (

            <Swiper
                autoplay
            >
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>

        )
    }



}