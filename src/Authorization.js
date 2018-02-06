import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
  } from 'react-native';
import store from "./store";
 

const Authorization = WrappedComponent => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        user: store.getState().user
      };

      store.subscribe(() => {
        this.setState({
          user: store.getState.user,
        });
      });
    }

    render() {
      //const { role } = this.state.user
      const { navigate } = this.props.navigation
      //console.log('Authorization');
      //console.dir(this.props);
      if (this.state.user) {
        return <WrappedComponent {...this.props} />;
      } else {
        return (
            <View>
                {navigate('SignIn')}
            </View>
        );
      }
    }
  };
};

export default Authorization;