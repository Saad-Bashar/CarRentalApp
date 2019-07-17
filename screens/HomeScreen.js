import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import MapView from 'react-native-maps';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: null,

			location: null,
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				// const location = JSON.stringify(position);

				this.setState({
					location: position,
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					},
				});
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<MapView region={this.state.region} style={{ flex: 1 }}>
					<MapView.Marker
						coordinate={{
							latitude: this.state.region ? this.state.region.latitude : 23.12,
							longitude: this.state.region ? this.state.region.longitude : 120.12,
						}}
						title="CAR1"
						description="car 1 description"
					/>
				</MapView>
			</View>
		);
	}
}

export default compose(
	firebaseConnect(() => {
		return ['users'];
	}),
	connect(state => {
		return {
			users: state.firebase.data.users,
		};
	})
)(HomeScreen);
