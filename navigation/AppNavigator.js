import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import AuthScreen from '../screens/AuthScreen';
import TutorialScreen from '../screens/TutorialScreen';

export default createAppContainer(
	createSwitchNavigator({
		LoadingScreen: LoadingScreen,
		AuthScreen: AuthScreen,
		Main: MainTabNavigator,
		TutorialScreen: TutorialScreen,
	})
);
