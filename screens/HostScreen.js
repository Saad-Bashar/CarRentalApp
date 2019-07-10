import React, { Component } from 'react';
import { Text, View, Button, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ImagePicker, Permissions, Constants } from 'expo';
import firebase from 'firebase';

class HostScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			image: null,
		};
	}

	uploadImage = async uri => {
		console.log('in');
		const response = await fetch(uri);
		console.log(response);
		const blob = await response.blob();
		var ref = firebase
			.storage()
			.ref()
			.child('my-image/');
		return ref.put(blob);
	};

	componentDidMount() {
		this.getPermissionAsync();
	}

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
		});

		console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result.uri });
			if (!result.cancelled) {
				this.uploadImage(result.uri, 'test-image')
					.then(res => {
						Alert.alert('Success');
						console.log(res);
					})
					.catch(error => {
						Alert.alert(error);
						console.log('error ', error);
					});
			}
		}
	};

	onSetLocation = (data, details) => {
		let location = details.geometry.location;
		let newData = { ...this.state.data, ...location };
		console.log('data', newData);

		// this.setState({
		// 	data,
		// });
	};

	updateData = data => {
		const { firebase, auth } = this.props;
		const uid = auth.uid;

		firebase
			.database()
			.ref(`/Cars/${uid}`)
			.push(data);
	};

	render() {
		let { image } = this.state;
		return (
			<View style={{ flex: 1, marginTop: 50, marginHorizontal: 25 }}>
				<GooglePlacesAutocomplete
					placeholder={'Select your location'}
					minLength={2}
					autoFocus={true}
					returnKeyType={'search'}
					listViewDisplayed="true"
					fetchDetails={true}
					renderDescription={row => row.description}
					onPress={this.onSetLocation}
					getDefaultValue={() => ''}
					query={{
						key: 'AIzaSyCoILimFA-jNjmsBHy8Vhe2tubGdL1ehx4',
						language: 'en',
					}}
					currentLocation={true}
					currentLocationLabel="Current location"
					fetchDetails={true}
					debounce={200}
					styles={{
						textInputContainer: {
							width: '100%',
						},
						description: {
							fontWeight: 'bold',
						},
						predefinedPlacesDescription: {
							color: '#1faadb',
						},
					}}
				/>

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Button title="Pick an image from camera roll" onPress={this._pickImage} />
					{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
				</View>
			</View>
		);
	}
}

export default compose(
	firebaseConnect(() => {}),
	connect(state => {
		return {};
	})
)(HostScreen);
