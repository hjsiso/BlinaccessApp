import App from '../App'
import Details from '../components/Details'
import Search from '../components/Search'
import ShowImage from '../components/ShowImage'
import SignIn from '../components/SignIn'
import About from '../components/About'
import Contact from '../components/Contact'
import Cart from '../components/Cart'

const Routes = {
    Home: {
        screen: App,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    Details: {
        screen: Details,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    Search: {
        screen: Search,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    ShowImage: {
        screen: ShowImage,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    Contact: {
        screen: Contact,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    Cart: {
        screen: Cart,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    }
}

export default Routes