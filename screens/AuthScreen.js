import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import TutorialScreen from './TutorialScreen';

export default class AuthScreen extends Component {
	componentDidMount() {
		AsyncStorage.getItem('alreadyLaunched').then(value => {
			console.log('value ', value);
			if (value === null) {
				AsyncStorage.setItem('alreadyLaunched', 'true').then(() => {
					this.props.navigation.navigate('TutorialScreen');
				});
			} else {
				AsyncStorage.removeItem('alreadyLaunched');
				// this.props.navigation.navigate('TutorialScreen');
			}
		});
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text> AuthScreen </Text>
			</View>
		);
	}
}
