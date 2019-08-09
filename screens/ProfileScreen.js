import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ProfileScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			image: null,
		};
	}

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

	onChooseImagePress = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
		});

		if (!result.cancelled) {
			this.setState({ image: result.uri });

			this.uploadImage(result.uri, 'test-image');
		}
	};

	uploadImage = async (uri, imageName) => {
		// 1 - Converting to firebase format
		const response = await fetch(uri); // uri -> fetch
		// 2 - Converting to firebase format
		const blob = await response.blob(); // response -> blob

		const { firebase, auth } = this.props;
		const uid = auth.uid;

		// 3 - Create the path
		var ref = firebase
			.storage()
			.ref()
			.child('images/' + imageName);

		// 4 -> Save the picture
		ref.put(blob)
			.then(() => ref.getDownloadURL()) // 5 - downloadUrl
			.then(res =>
				firebase
					.database()
					.ref(`/users/${uid}`)
					.update({ image: res })
			);
	};

	render() {
		let { image } = this.state;

		return (
			<View style={styles.container}>
				<Button title="Choose image..." onPress={this.onChooseImagePress} />

				{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: 50, alignItems: 'center' },
});

export default compose(
	firebaseConnect(() => {}),
	connect(state => {
		return {
			auth: state.firebase.auth,
		};
	})
)(ProfileScreen);
