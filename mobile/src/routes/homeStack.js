import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../pages/Login';
import AR from '../pages/AR';
import Start_Logout from '../pages/Start_Logout';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Start_Logout" component={Start_Logout} />
        <Stack.Screen name="AR" component={AR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
