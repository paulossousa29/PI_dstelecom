import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../pages/Login';
import AR from '../pages/AR';
import Start_Logout from '../pages/Start_Logout';
import Notes from '../pages/Notes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Start_Logout" component={Start_Logout} />
        <Stack.Screen name="AR" component={AR} />
        <Stack.Screen name="Notes" component={Notes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
