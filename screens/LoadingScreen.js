import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import firebase from 'firebase';

export default class LoadingScreen extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setFlow();
	}

	setFlow = () => {
		const { navigation } = this.props;

		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				navigation.navigate('Auth');
			} else {
				navigation.navigate('Main');
			}
		});
	};

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size="large" color={Colors.tintColor} />
			</View>
		);
	}
}
