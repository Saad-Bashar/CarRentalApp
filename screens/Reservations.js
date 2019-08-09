import React, { Component } from 'react';
import { Text, View, FlatList, ImageBackground, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import ListItem from '../components/ListItem';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SortButton from '../components/SortButton';
import ActiveReservations from './ActiveReservations';
import CompleteReservations from './CompleteReservations';

class Reservations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'All',
			visible: false,
		};
	}

	toStatus = () => {
		this.setState({
			visible: !this.state.visible,
		});
	};

	keyExtractor = item => item[0];

	renderItem = ({ item }) => {
		return <ListItem item={item} />;
	};

	onStatusSelected = item => {
		this.setState({
			status: item.key,
			visible: false,
		});
	};

	statusRender = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => this.onStatusSelected(item)}
				style={{ paddingLeft: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}
			>
				<Text style={{ fontWeight: 'bold' }}>{item.value}</Text>
			</TouchableOpacity>
		);
	};

	getList = () => {
		const { status } = this.state;
		const { list, activeList, completeList } = this.props;

		switch (status) {
			case 'Active':
				return <ActiveReservations list={activeList} />;
			case 'Completed':
				return <CompleteReservations list={completeList} />;

			default:
				return (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={list}
						keyExtractor={this.keyExtractor}
						renderItem={this.renderItem}
					/>
				);
		}
	};

	render() {
		const status = [
			{ key: 'All', value: 'All' },
			{ key: 'Active', value: 'Active' },
			{ key: 'Completed', value: 'Completed' },
		];

		return (
			<ImageBackground source={require('../assets/images/bgBlue.png')} style={{ height: '100%', width: '100%' }}>
				<View style={{ flex: 1, marginTop: 50, marginHorizontal: 20 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 25 }}>
						<SortButton
							onPressedProp={this.toStatus}
							customStyles={{ borderColor: '#fff', backgroundColor: '#fff', marginBottom: 0 }}
							customTextStyle={{
								color: '#02d5ff',
								paddingVertical: 5,
								fontWeight: 'bold',
								fontSize: 12,
							}}
						>
							{this.state.status}
							<AntDesign name="down" color="#02d5ff" size={15} />
						</SortButton>
					</View>

					{this.getList()}
				</View>

				{this.state.visible && (
					<View
						style={{ backgroundColor: '#fff', position: 'absolute', width: '100%', bottom: 0, zIndex: 3 }}
					>
						<FlatList
							data={status}
							renderItem={this.statusRender}
							keyExtractor={(item, index) => index.toString}
						/>
					</View>
				)}
			</ImageBackground>
		);
	}
}

export default compose(
	firebaseConnect(() => {
		const uid = getFirebase().auth().currentUser.uid;

		return [`Reservations/${uid}`];
	}),
	connect(state => {
		let reservationList = state.firebase.data.Reservations && Object.entries(state.firebase.data.Reservations);
		let list = reservationList && Object.entries(reservationList[0][1]);
		let activeList = [];
		let completeList = [];

		if (list) {
			activeList = list.filter(item => {
				return item[1].isActive == true;
			});

			completeList = list.filter(item => {
				return item[1].isComplete == true;
			});
		}

		return {
			list,
			activeList,
			completeList,
		};
	})
)(Reservations);
