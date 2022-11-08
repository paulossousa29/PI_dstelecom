import React from 'react';

import {StyleSheet, View} from 'react-native';
import Login from './pages/Login';
import Start_Logout from './pages/Start_Logout';
import Notes from './pages/Notes';
import AR from './pages/AR';
import MyStack from './routes/HomeStack';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {
  return <MyStack />;
};

export default App;
