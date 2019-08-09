import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import MapView from 'react-native-maps';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: 23.8103,
				longitude: 90.4125,
				latitudeDelta: 0.03,
				longitudeDelta: 0.03,
			},
		};
	}

	render() {
		const { region } = this.state;
		const { cars } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<MapView region={region} style={{ flex: 1 }}>
					{cars &&
						cars.map(item => {
							return (
								<MapView.Marker
									key={item[0]}
									coordinate={{
										latitude: item[1].lat,
										longitude: item[1].lng,
									}}
									title={item[1].location}
								>
									<Image
										style={{ height: 30, width: 30 }}
										source={{
											uri:
												'https://cdn2.iconfinder.com/data/icons/auto-cars/154/sport-car-coupe-auto-top-view-512.png',
										}}
									/>
								</MapView.Marker>
							);
						})}
				</MapView>
			</View>
		);
	}
}

export default compose(
	firebaseConnect(() => {
		return ['cars'];
	}),
	connect(state => {
		return {
			cars: state.firebase.data.cars && Object.entries(state.firebase.data.cars),
		};
	})
)(HomeScreen);
