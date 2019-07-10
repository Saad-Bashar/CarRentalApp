import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import AuthScreen from '../screens/AuthScreen';
import TutorialScreen from '../screens/TutorialScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthStack = createStackNavigator({
	AuthScreen: AuthScreen,
	SignInScreen: SignInScreen,
	SignUpScreen: SignUpScreen,
});

export default createAppContainer(
	createSwitchNavigator({
		LoadingScreen: LoadingScreen,
		Auth: AuthStack,
		Main: MainTabNavigator,
		TutorialScreen: TutorialScreen,
	})
);
