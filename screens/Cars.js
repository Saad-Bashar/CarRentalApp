import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

class Cars extends Component {
	renderItem = ({ item }) => {
		return (
			<Card isDark={false}>
				<CardImage source={{ uri: item[1].image }} />

				<CardContent text={`${item[1].name}, year -  ${item[1].year} mileage -  ${item[1].mileage}`} />

				<CardAction separator={true} inColumn={false}>
					<CardButton
						onPress={() => {
							this.props.navigation.navigate('Reserve', { item: item });
						}}
						title="Book"
						color="#FEB557"
					/>
				</CardAction>
			</Card>
		);
	};

	render() {
		const { cars } = this.props;
		return (
			<View style={{ flex: 1, marginTop: 60 }}>
				<FlatList
					data={cars && cars}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={{ marginHorizontal: 25, paddingBottom: 30 }}
				/>
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
)(Cars);
