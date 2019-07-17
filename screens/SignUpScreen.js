import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import * as firebase from 'firebase';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default class SignUpScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			gender: '',
			age: '',
			firstName: '',
			lastName: '',
			emailError: null,
		};
	}

	handleInput = (key, value) => {
		this.setState({
			[key]: value,
		});
	};

	checkEmail = () => {
		const { email } = this.state;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isValid = re.test(String(email).toLowerCase());

		if (!isValid) {
			this.setState({
				emailError: 'Invalid Email',
			});
		} else {
			this.setState({
				emailError: null,
			});
		}
	};

	signUpUser = () => {
		const { email, password, firstName, lastName, age, gender } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log('user ', user);

				const userID = user.user.uid;

				firebase
					.database()
					.ref('users/' + userID)
					.set({
						firstName,
						lastName,
						age,
						gender,
					});
			});
	};

	render() {
		return (
			<ScrollView style={{ flex: 1 }}>
				<View style={{ margin: 25 }}>
					<Input
						handleInput={text => this.handleInput('email', text)}
						onBlur={this.checkEmail}
						placeholder="Email"
						error={this.state.emailError}
					/>

					<Input
						handleInput={text => this.handleInput('password', text)}
						secureTextEntry={true}
						placeholder="Password"
					/>

					<View style={{ flexDirection: 'row' }}>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1, marginRight: 5 }}
							handleInput={text => this.handleInput('firstName', text)}
							placeholder="First Name"
						/>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1 }}
							handleInput={text => this.handleInput('lastName', text)}
							placeholder="Last Name"
						/>
					</View>

					<View style={{ flexDirection: 'row' }}>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1, marginRight: 5 }}
							handleInput={text => this.handleInput('age', text)}
							placeholder="Age"
						/>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1 }}
							handleInput={text => this.handleInput('gender', text)}
							placeholder="Gender"
						/>
					</View>

					<Button onButtonPress={this.signUpUser} title="Sign Up" />
				</View>
			</ScrollView>
		);
	}
}
