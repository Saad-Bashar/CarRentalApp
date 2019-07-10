import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import TutorialScreen from './TutorialScreen';
import Button from '../components/common/Button';

export default class AuthScreen extends Component {
	componentDidMount() {
		AsyncStorage.getItem('alreadyLaunched').then(value => {
			console.log('value ', value);
			if (value === null) {
				AsyncStorage.setItem('alreadyLaunched', 'true').then(() => {
					this.props.navigation.navigate('TutorialScreen');
				});
			}
		});
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Button
					onButtonPress={() => this.props.navigation.navigate('SignInScreen')}
					backgroundColor="orange"
					title={'Login with Email'}
				/>
				<Button
					onButtonPress={() => this.props.navigation.navigate('SignUpScreen')}
					title={'Sign Up  with Email'}
				/>
			</View>
		);
	}
}
