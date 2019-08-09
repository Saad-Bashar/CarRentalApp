import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

export default class ActiveReservations extends Component {
	renderItem = ({ item }) => {
		return <ListItem item={item} />;
	};

	render() {
		const { list } = this.props;
		return (
			<View style={{ flex: 1, padding: 10 }}>
				<FlatList data={list} renderItem={this.renderItem} />
			</View>
		);
	}
}
