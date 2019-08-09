import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Cars from '../screens/Cars';
import Reserve from '../screens/Reserve';
import Reservations from '../screens/Reservations';
import ProfileScreen from '../screens/ProfileScreen';

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: { headerMode: 'none' },
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: 'Explore',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
			}
		/>
	),
};

HomeStack.path = '';

const CarStack = createStackNavigator(
	{
		Cars: Cars,
		Reserve: Reserve,
	},
	config
);

CarStack.navigationOptions = {
	tabBarLabel: 'Cars',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'} />,
};

CarStack.path = '';

const ReservationsStack = createStackNavigator(
	{
		ReservationsScreen: Reservations,
	},
	config
);

ReservationsStack.navigationOptions = {
	tabBarLabel: 'Reservations',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	),
};

ReservationsStack.path = '';

const ProfileStack = createStackNavigator(
	{
		ProfileScreen: ProfileScreen,
	},
	config
);

ProfileStack.navigationOptions = {
	tabBarLabel: 'Profile',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	CarStack,
	ReservationsStack,
	ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
