import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider, useDispatch} from 'react-redux';
import rootReducer from './src/store/index';
import watchSaga from './src/saga/index';

// saga settings
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(watchSaga);

import WeatherMain from './src/Components/WeatherMain';
import SettingLocation from "./src/Components/SettingLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RESET_MY_LOCATION_DATA, SET_MY_LOCATION_DATA} from "./src/reducer/actionTypes";

type StackListType = {
  Home: undefined;
};

type SettingLocatinType = {
    SettingLocation : React.ComponentType
}

type RootStackParamList = {
    Main :StackListType,
    SettingLocation : SettingLocatinType,
}

const Stack = createStackNavigator<StackListType>();
const RootStack = createStackNavigator<RootStackParamList>();

const retrieveData = async () => {
    try {
        return await AsyncStorage.getItem('@myLocation');
    } catch(e) {
        console.log('retrieveData/AsyncStorage read Error', e);
        return false;
    }
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
        retrieveData()
            .then( (result) => {
                if(result) {
                    console.log('async Data to Redux :', result);
                    dispatch({
                        type : SET_MY_LOCATION_DATA,
                        data : {...JSON.parse(result)}
                    });
                };
            })
            .catch((e)=>{
                console.log('error get async Data :', e);
                dispatch({type : RESET_MY_LOCATION_DATA});
            });
  },[]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen
            name={'Home'}
            options={{
              title: 'Weather Memo',
            }}
            component={WeatherMain}
          />
        </Stack.Navigator>
    </>
  );
};

const CombineStack = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator mode={"modal"}>
                    <RootStack.Screen
                        name={"Main"}
                        component={App}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name={"SettingLocation"}
                        component={SettingLocation}
                        options={{
                            headerShown: false,
                            animationEnabled: false,
                        }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default CombineStack;
