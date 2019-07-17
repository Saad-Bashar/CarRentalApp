import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HostScreen from '../screens/HostScreen';

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

const HostStack = createStackNavigator(
	{
		Host: HostScreen,
	},
	config
);

HostStack.navigationOptions = {
	tabBarLabel: 'Host',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />,
};

HostStack.path = '';

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	config
);

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	HostStack,
	SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
