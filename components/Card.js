import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Card extends Component {
	render() {
		return <View style={styles.container}>{this.props.children}</View>;
	}
}

const styles = {
	container: {
		margin: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 1,
		backgroundColor: '#fff',
	},
};
