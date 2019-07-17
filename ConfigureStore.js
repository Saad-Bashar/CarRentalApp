import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const reduxFirebaseConfig = {
	userProfile: 'users',
	attachAuthIsReady: true,
	enableRedirectHandling: false,
};

const firebaseConfig = {
	apiKey: 'AIzaSyDdChSdD5tGMtrBF0UEqYDeHlwX59vYP54',
	authDomain: 'carrentalapp-a0cdf.firebaseapp.com',
	databaseURL: 'https://carrentalapp-a0cdf.firebaseio.com',
	projectId: 'carrentalapp-a0cdf',
	storageBucket: 'carrentalapp-a0cdf.appspot.com',
	messagingSenderId: '483909518363',
	appId: '1:483909518363:web:1f5966fbe71bed54',
};

const fb = firebase.initializeApp(firebaseConfig);

const firebaseEnhancer = compose(
	reactReduxFirebase(fb, reduxFirebaseConfig),
	applyMiddleware(thunk)
);

const enhancer = composeWithDevTools({
	// Options: https://github.com/jhen0409/react-native-debugger#options
})(firebaseEnhancer);

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	transforms: [immutableTransform()],
	blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(onStore, onAuthReady) {
	const store = createStore(persistedReducer, undefined, enhancer);
	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./reducers');
			store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
		});
	}
	persistStore(store, null, onStore);
	store.firebaseAuthIsReady.then(onAuthReady);
	return store;
}
